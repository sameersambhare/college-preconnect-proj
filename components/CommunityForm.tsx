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
import React, { useState } from 'react'
import { createCommunity } from '@/lib/actions/community.actions';
import { communityFormValidation } from '@/lib/validations';
import { useRouter } from 'next/navigation';

const CommunityForm = ({UserId}:{UserId:string}) => {
      const router = useRouter();
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState('');
      
      const form = useForm<z.infer<typeof communityFormValidation>>({
        resolver: zodResolver(communityFormValidation),
        defaultValues: {
          communityName:'',
          description:'',
        },
      })
      
      async function onSubmit(values: z.infer<typeof communityFormValidation>) {
        setIsLoading(true);
        setError('');
        
        try {
            await createCommunity(values.communityName, UserId, values.description);
            form.reset();
            router.push('/communities')
        } catch(error: any) {
            console.error(error);
            setError(error.message || 'Failed to create community');
        } finally {
            setIsLoading(false);
        }
      }
      
  return (
    <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto p-8 bg-white">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h4 className="text-orange-500 font-medium mb-2">Community Setup</h4>
                <h2 className="text-3xl font-bold text-gray-900">Create Your Own Community</h2>
              </div>
              
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                  {error}
                </div>
              )}
              
              <FormField
                control={form.control}
                name="communityName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Community Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter community name" className="mt-1 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50" {...field} />
                    </FormControl>
                    <FormDescription className="text-gray-600">
                      This is your public community name.
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Description *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter community description" className="mt-1 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50" {...field} />
                    </FormControl>
                    <FormDescription className="text-gray-600">
                      Your community description.
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-center pt-6">
              <Button 
                type="submit" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-md transition-colors duration-200 hover:cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Submit'}
              </Button>
            </div>
          </form>
        </Form>
    </div>
  )
}

export default CommunityForm