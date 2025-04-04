"use server";
import userModel from "../models/user";
import { connectDatabase } from "../connectdb";
import { revalidatePath } from "next/cache";

export async function fetchUser(userEmail: string) {
  try {
    await connectDatabase();
    const user = await userModel.findOne({ email: userEmail }).lean();
    return JSON.parse(JSON.stringify(user));
  } catch (err: any) {
    throw new Error(`Error in fetching user: ${err.message}`);
  }
}

export async function updateUser(userData: any) {
  const {
    name,
    email,
    collegename,
    branch,
    year,
    mobile,
    address,
    city,
    dob,
    district,
    state,
    gender,
    profileimage,
    path,
  } = userData;
  try {
    await connectDatabase();
    
    // Check if user exists
    const existingUser = await userModel.findOne({ email: email });
    
    if (!existingUser) {
      // Create new user if doesn't exist
      const createdUser = await userModel.create({
        name,
        email,
        collegename,
        branch,
        year,
        mobile,
        address,
        dob,
        district,
        onboarded: true,
        state,
        gender,
        profileimage,
        city,
      });
      return JSON.parse(JSON.stringify(createdUser));
    } else {
      // Update existing user
      const updatedUser = await userModel
        .findOneAndUpdate(
          { email: email },
          {
            name,
            email,
            collegename,
            branch,
            year,
            mobile,
            address,
            dob,
            district,
            onboarded: true,
            state,
            gender,
            profileimage,
            city,
          },
          {
            new: true, // Return the updated document
          }
        )
        .lean();
      return JSON.parse(JSON.stringify(updatedUser));
    }

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (err: any) {
    throw new Error(`Error in updating user: ${err.message}`);
  }
}

export async function fetchAllUsers(userId: string) {
  try {
    await connectDatabase();
    console.log(userId);
    const user = await userModel.findById(userId);
    const users = await userModel.find({
      _id: { $nin: [...user.connections, userId] },
    });
    console.log(users);
    return JSON.parse(JSON.stringify(users));
  } catch (err: any) {
    throw new Error(`Error in fetching all users: ${err.message}`);
  }
}

export async function sendConnectionRequest(
  senderId: string,
  receiverId: string
) {
  try {
    await connectDatabase();

    // Check if request already exists
    const sender: any = await userModel.findById(senderId).lean();
    if (
      sender &&
      sender.sendRequests &&
      Array.isArray(sender.sendRequests) &&
      sender.sendRequests.some((id: any) => id.toString() === receiverId)
    ) {
      return { success: false, message: "Connection request already sent" };
    }

    // If no existing request, proceed with sending
    await userModel.findByIdAndUpdate(senderId, {
      $push: {
        sendRequests: receiverId,
      },
    });
    await userModel.findByIdAndUpdate(receiverId, {
      $push: {
        receivedRequests: senderId,
      },
    });
    return { success: true, message: "Connection request sent" };
  } catch (err: any) {
    throw new Error(`Error in sending connection request: ${err.message}`);
  }
}

export async function fetchConnections(userId: string) {
  try {
    await connectDatabase();
    const user = await userModel.findById(userId).populate({
      path: "connections",
      select: "_id name email collegename branch year",
    });
    const connections = user?.connections || [];
    console.log(connections);
    return JSON.parse(JSON.stringify(connections));
  } catch (err: any) {
    throw new Error(`Error in fetching connections: ${err.message}`);
  }
}

export async function showsendRequests(userId: string) {
  try {
    await connectDatabase();
    const user = await userModel
      .findById(userId)
      .select("sendRequests")
      .populate({
        path: "sendRequests",
        select: "_id name email collegename branch year",
      });
    const requests = user?.sendRequests || [];
    return JSON.parse(JSON.stringify(user?.sendRequests));
  } catch (err: any) {
    throw new Error(`Error in showing send requests: ${err.message}`);
  }
}

export async function fetchNotifications(userId: string) {
  try {
    await connectDatabase();
    const user = await userModel
      .findById(userId)
      .select("receivedRequests")
      .populate({
        path: "receivedRequests",
        select: "_id name email collegename branch year",
      });
    const receivedRequests = user?.receivedRequests || [];
    if (receivedRequests.length > 0) {
      return JSON.parse(JSON.stringify(receivedRequests));
    } else {
      return { success: false, message: "No notifications found" };
    }
  } catch (err: any) {
    throw new Error(`Error in fetching notifications: ${err.message}`);
  }
}

export async function acceptConnectionRequest(
  senderId: string,
  receiverId: string
) {
  try {
    await connectDatabase();
    // Add both users to each other's connections
    await userModel.findByIdAndUpdate(senderId, {
      $push: {
        connections: receiverId,
      },
      $pull: {
        sendRequests: receiverId,
      },
    });
    await userModel.findByIdAndUpdate(receiverId, {
      $push: {
        connections: senderId,
      },
      $pull: {
        receivedRequests: senderId,
      },
    });

    return { success: true, message: "Connection request accepted" };
  } catch (err: any) {
    throw new Error(`Error in accepting connection request: ${err.message}`);
  }
}

export async function declineConnectionRequest(
  senderId: string,
  receiverId: string
) {
  try {
    await connectDatabase();

    // Remove request from sender's sendRequests
    await userModel.findByIdAndUpdate(senderId, {
      $pull: {
        sendRequests: receiverId,
      },
    });

    // Remove request from receiver's receivedRequests
    await userModel.findByIdAndUpdate(receiverId, {
      $pull: {
        receivedRequests: senderId,
      },
    });

    return { success: true, message: "Connection request declined" };
  } catch (err: any) {
    throw new Error(`Error in declining connection request: ${err.message}`);
  }
}

export async function fetchUserById(userId: string) {
  try {
    await connectDatabase();
    const user = await userModel.findById(userId);
    return JSON.parse(JSON.stringify(user));
  } catch (err: any) {
    throw new Error(`Error in fetching  the user by id: ${err.message}`);
  }
}

export async function filterStudents(filters: any) {
  try {
    await connectDatabase();
    
    // Build the filter query
    const query: any = {};
    
    // Add filters if they have values
    if (filters.college && filters.college !== "all") {
      query.collegename = filters.college;
    }
    if (filters.branch && filters.branch !== "all") {
      query.branch = { $regex: new RegExp(filters.branch, 'i') };
    }
    if (filters.year && filters.year !== "all") {
      query.year = filters.year;
    }
    if (filters.city && filters.city !== "all") {
      query.city = { $regex: new RegExp(filters.city, 'i') };
    }
    if (filters.district && filters.district !== "all") {
      query.district = { $regex: new RegExp(filters.district, 'i') };
    }
    if (filters.state && filters.state !== "all") {
      query.state = { $regex: new RegExp(filters.state, 'i') };
    }
    if (filters.gender && filters.gender !== "all") {
      query.gender = { $regex: new RegExp(filters.gender, 'i') };
    }
    
    // Get sort options
    const sortField = filters.sort?.field || "name";
    const sortOrder = filters.sort?.order === "desc" ? -1 : 1;
    
    // Execute the query with sorting
    let students = await userModel
      .find(query)
      .sort({ [sortField]: sortOrder })
      .lean();
    
    // Exclude the current user and users in their connections array
    if (filters.currentUserId) {
      // Get the current user's connections
      const currentUser = await userModel.findById(filters.currentUserId).select('connections').lean();
      const connectionIds = (currentUser as any)?.connections || [];
      
      // Filter out the current user and their connections
      students = students.filter(student => {
        const studentId = (student as any)._id?.toString();
        return studentId !== filters.currentUserId && !connectionIds.includes(studentId);
      });
    }
    
    return JSON.parse(JSON.stringify(students));
  } catch (err: any) {
    throw new Error(`Error in filtering students: ${err.message}`);
  }
}
