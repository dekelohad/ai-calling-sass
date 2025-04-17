"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuthStore, useBusinessStore } from "@/lib/store"
import { BusinessProfile } from "@/lib/store/business-store"
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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const formSchema = z.object({
  name: z.string().min(2, "Business name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  industry: z.string().min(1, "Please select an industry"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  address: z.string().min(1, "Please enter your business address"),
})

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Retail",
  "Manufacturing",
  "Education",
  "Real Estate",
  "Professional Services",
  "Other",
]

const defaultBusinessHours = {
  monday: { start: "09:00", end: "17:00", isOpen: true },
  tuesday: { start: "09:00", end: "17:00", isOpen: true },
  wednesday: { start: "09:00", end: "17:00", isOpen: true },
  thursday: { start: "09:00", end: "17:00", isOpen: true },
  friday: { start: "09:00", end: "17:00", isOpen: true },
  saturday: { start: "09:00", end: "17:00", isOpen: false },
  sunday: { start: "09:00", end: "17:00", isOpen: false },
}

const defaultNotificationPreferences = {
  email: true,
  sms: false,
  emailAddress: "",
  phoneNumber: "",
}

export function BusinessProfileForm() {
  const { user, isLoading: isAuthLoading } = useAuthStore()
  const { businessProfile, isLoading: isBusinessLoading, error, fetchBusinessProfile, updateBusinessProfile } = useBusinessStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      industry: "",
      website: "",
      address: "",
    },
  })

  useEffect(() => {
    if (user?.uid) {
      console.log("Fetching business profile for user:", user.uid)
      fetchBusinessProfile(user.uid)
    }
  }, [user?.uid, fetchBusinessProfile])

  useEffect(() => {
    if (businessProfile) {
      console.log("Resetting form with business profile:", businessProfile)
      form.reset({
        name: businessProfile.name,
        description: businessProfile.description,
        industry: businessProfile.industry,
        website: businessProfile.website || "",
        address: businessProfile.address || "",
      })
    } else if (user?.uid && !isBusinessLoading) {
      // If no business profile exists yet, set default values
      console.log("No business profile found, setting default values")
      form.reset({
        name: "",
        description: "",
        industry: "",
        website: "",
        address: "",
      })
    }
  }, [businessProfile, form, user?.uid, isBusinessLoading])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values)
    
    if (!user?.uid) {
      console.error("No user ID found")
      toast.error("You must be logged in to update your business profile")
      return
    }

    if (!form.formState.isValid) {
      console.error("Form validation errors:", form.formState.errors)
      return
    }

    try {
      const profileData = {
        ...values,
        ownerId: user.uid,
        businessHours: defaultBusinessHours,
        notificationPreferences: defaultNotificationPreferences,
      }

      console.log("Attempting to update business profile with data:", profileData)
      await updateBusinessProfile(user.uid, profileData)
      console.log("Business profile updated successfully")
      toast.success("Business profile updated successfully")
    } catch (error) {
      console.error("Error updating business profile:", error)
      toast.error(error instanceof Error ? error.message : "Failed to update business profile")
    }
  }

  console.log("Current form state:", {
    values: form.getValues(),
    errors: form.formState.errors,
    isValid: form.formState.isValid,
    isDirty: form.formState.isDirty,
  })

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user?.uid) {
    return (
      <Alert className="bg-destructive/10 text-destructive">
        <AlertDescription>
          You must be logged in to view and edit your business profile.
        </AlertDescription>
      </Alert>
    )
  }

  if (isBusinessLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert>
        <AlertDescription className="text-destructive">{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your business name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your business name as it will appear to customers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your business"
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a brief description of your business and its services.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the industry that best describes your business.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://your-business.com" {...field} />
                </FormControl>
                <FormDescription>
                  Your business website URL (optional).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your business address" {...field} />
                </FormControl>
                <FormDescription>
                  Your business physical address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isBusinessLoading || !form.formState.isValid}
            onClick={() => console.log("Submit button clicked")}
          >
            {isBusinessLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isBusinessLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  )
} 