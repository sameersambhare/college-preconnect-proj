"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {userFormValidationSchema} from "@/lib/validations"
import { updateUser } from "@/lib/actions/user.actions"
import { usePathname,useRouter } from "next/navigation"

const stateToDistricts: { [key: string]: string[] } = {
  "andhra pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Sri Potti Sriramulu Nellore", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
  "bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
  "delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South West Delhi", "West Delhi"],
  "gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kachchh", "Kheda", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
  "karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagara", "Chikballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davangere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
  "maharashtra": ["Ahilyanagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
  "tamil nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
  "uttar pradesh": ["Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kanshiram Nagar", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Rae Bareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
  "west bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"]
}

const indianStates = Object.keys(stateToDistricts).map(state => 
  state.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
)

export function ProfileForm({email}:{email:string}) {
  const form = useForm<z.infer<typeof userFormValidationSchema>>({
    resolver: zodResolver(userFormValidationSchema),
    defaultValues: {
      name: "",
      email: email,
      collegename: "",
      branch: "",
      year: 1,
      mobile: "",
      address: "",
      city: "",
      state: "",
      gender: "",
      profileimage: "",
      dob: "",
      district: "",
    },
  })
  const router = useRouter()
  const pathname = usePathname()
  async function onSubmit(values: z.infer<typeof userFormValidationSchema>) {
    try{
        await updateUser({
            name: values.name,
            email: values.email,
            collegename: values.collegename,
            branch: values.branch,
            year: values.year,
            mobile: values.mobile,
            address: values.address,
            city: values.city,
            state: values.state,
            gender: values.gender,
            dob:values.dob,
            district:values.district,
            profileimage: values.profileimage,
            path:pathname,
        })
        if(pathname === "/profile/edit"){
            router.back()
        }
        else{
            router.push("/")
        }
    }
    catch(error){
        console.log(error)
    }
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto p-8 bg-white">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h4 className="text-orange-500 font-medium mb-2">Profile Setup</h4>
            <h2 className="text-3xl font-bold text-gray-900">Complete Your Profile</h2>
            <p className="text-gray-600 mt-2">Help us personalize your experience</p>
          </div>
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" className="mt-1 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50" {...field} />
                </FormControl>
                <FormDescription className="text-gray-600">
                  This is your public display name.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Email *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" readOnly type="email" className="mt-1 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50" {...field} />
                </FormControl>
                <FormDescription className="text-gray-600">
                  Your email address.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Mobile Number *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your mobile number" type="tel" className="mt-1 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50" {...field} />
                </FormControl>
                <FormDescription className="text-gray-600">
                  Your contact number.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="collegename"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">College Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your college name" className="mt-1 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50" {...field} />
                </FormControl>
                <FormDescription className="text-gray-600">
                  The name of your college.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Branch *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your branch" className="mt-1 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50" {...field} />
                </FormControl>
                <FormDescription className="text-gray-600">
                  Your branch of study.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-gray-700 font-medium">Gender *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="mt-1 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50">
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-gray-600">
                    Your gender.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-gray-700 font-medium">Date of Birth *</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      className="mt-1 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription className="text-gray-600">
                    Your date of birth.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-gray-700 font-medium">Year *</FormLabel>
                  <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger className="mt-1 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50">
                        <SelectValue placeholder="Select your year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1st Year</SelectItem>
                      <SelectItem value="2">2nd Year</SelectItem>
                      <SelectItem value="3">3rd Year</SelectItem>
                      <SelectItem value="4">4th Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-gray-600">
                    Your current year of study.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Address *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your address" className="mt-1 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50" {...field} />
                </FormControl>
                <FormDescription className="text-gray-600">
                  Your complete address.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">City *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your city" className="mt-1 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50" {...field} />
                </FormControl>
                <FormDescription className="text-gray-600">
                  Your city of residence.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">District *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="mt-1 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50">
                      <SelectValue placeholder="Select your district" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {form.watch("state") ? (
                      stateToDistricts[form.watch("state")]?.map((district) => (
                        <SelectItem key={district} value={district.toLowerCase()}>
                          {district}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="select-state-first" disabled>Select a state first</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormDescription className="text-gray-600">
                  Your district of residence.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">State *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="mt-1 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state.toLowerCase()}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-gray-600">
                  Your state of residence.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          </div>
        </div>
        
        <div className="flex justify-center pt-6">
          <Button 
            type="submit" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-md transition-colors duration-200 hover:cursor-pointer"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
