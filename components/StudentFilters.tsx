"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Import the state and district mapping from ProfileForm
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

// Predefined options for gender and year
const genderOptions = ["male", "female", "others"]
const yearOptions = ["1", "2", "3", "4"]

interface StudentFiltersProps {
  colleges: string[]
  branches: string[]
  years: number[]
  cities: string[]
  districts: string[]
  states: string[]
  genders: string[]
  onFilterChange: (filters: any) => void
}

export default function StudentFilters({
  colleges,
  branches,
  years,
  cities,
  districts,
  states,
  genders,
  onFilterChange
}: StudentFiltersProps) {
  const [filters, setFilters] = useState({
    college: "all",
    branch: "all",
    year: "all",
    city: "all",
    district: "all",
    state: "all",
    gender: "all"
  })
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedState, setSelectedState] = useState("all")

  // Use predefined options or fallback to provided options
  const filterOptions = {
    college: colleges,
    branch: branches,
    year: yearOptions,
    city: cities,
    district: selectedState !== "all" ? stateToDistricts[selectedState.toLowerCase()] || [] : districts,
    state: indianStates,
    gender: genderOptions
  }

  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "college", label: "College" },
    { value: "branch", label: "Branch" },
    { value: "year", label: "Year" },
    { value: "city", label: "City" },
    { value: "district", label: "District" },
    { value: "state", label: "State" }
  ]

  const handleFilterChange = (type: string, value: string) => {
    const newFilters = { ...filters, [type]: value }
    
    // If state changes, reset district
    if (type === "state") {
      setSelectedState(value)
      newFilters.district = "all"
    }
    
    setFilters(newFilters)
  }

  const handleSortChange = (field: string) => {
    setSortBy(field)
    onFilterChange({ 
      ...filters,
      sort: { field, order: sortOrder }
    })
  }

  const handleSortOrderChange = (order: string) => {
    setSortOrder(order)
    onFilterChange({ 
      ...filters,
      sort: { field: sortBy, order }
    })
  }

  const applyFilters = () => {
    // Convert "all" values to empty strings for the API
    const apiFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      acc[key] = value === "all" ? "" : value;
      return acc;
    }, {} as Record<string, string>);
    
    onFilterChange({ 
      ...apiFilters,
      sort: { field: sortBy, order: sortOrder }
    })
    setIsFilterOpen(false)
  }

  const resetFilters = () => {
    const emptyFilters = {
      college: "all",
      branch: "all",
      year: "all",
      city: "all",
      district: "all",
      state: "all",
      gender: "all"
    }
    setFilters(emptyFilters)
    setSelectedState("all")
    setSortBy("name")
    setSortOrder("asc")
    onFilterChange({ 
      college: "",
      branch: "",
      year: "",
      city: "",
      district: "",
      state: "",
      gender: "",
      sort: { field: "name", order: "asc" }
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8">
      <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 min-w-[120px]">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-6 shadow-lg">
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-semibold">Filter Options</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetFilters}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Reset All
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(filterOptions).map(([type, options]) => (
                <div key={type} className="space-y-2">
                  <label className="text-sm font-medium capitalize">{type}</label>
                  <Select 
                    value={filters[type as keyof typeof filters]} 
                    onValueChange={(value) => handleFilterChange(type, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={`Select ${type}`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {options.map((option) => (
                        <SelectItem key={String(option)} value={String(option)}>
                          {type === "year" ? `${option}${getYearSuffix(Number(option))} Year` : 
                           type === "gender" ? capitalizeFirstLetter(String(option)) : 
                           String(option)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end pt-4 border-t">
              <Button 
                onClick={applyFilters}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Sort by:</span>
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Order:</span>
        <Select value={sortOrder} onValueChange={handleSortOrderChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

// Helper functions
function getYearSuffix(year: number): string {
  if (year === 1) return "st";
  if (year === 2) return "nd";
  if (year === 3) return "rd";
  return "th";
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
} 