'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { database } from '@/lib/database';
import {
  hasCompletedApplication,
  setApplicationCompletedCookie
} from '@/lib/application-cookies';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  techdom_experience: z.enum(
    ['beginner', 'intermediate', 'advanced', 'expert'],
    {
      required_error: 'Please select your experience level'
    }
  ),
  spending_willingness: z.enum(
    ['0', '20-50', '60-100', '100-200', 'unlimited'],
    {
      required_error: 'Please select your spending willingness'
    }
  ),
  beta_reason: z
    .string()
    .min(
      50,
      'Please provide at least 50 characters explaining why you should be a beta tester'
    )
});

type FormData = z.infer<typeof formSchema>;

export default function SinkSyncInviteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasAlreadyApplied, setHasAlreadyApplied] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      techdom_experience: undefined,
      spending_willingness: undefined,
      beta_reason: ''
    }
  });

  // Check if user has already applied on component mount (client-side only)
  useEffect(() => {
    // Only run on client-side to avoid hydration mismatch
    const checkApplication = () => {
      setHasAlreadyApplied(hasCompletedApplication());
    };
    checkApplication();
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Log the data for now to verify form works
      console.log('Form data:', data);

      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // TODO: Uncomment when database is ready
      // await database.submitInviteRequest(data);

      // Set cookie to indicate application completion
      setApplicationCompletedCookie();
      setHasAlreadyApplied(true);
      setIsSubmitted(true);
      form.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while submitting your request'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show success message only for fresh submissions
  if (isSubmitted) {
    return (
      <Card className='mx-auto w-full max-w-2xl border-green-200 bg-green-50'>
        <CardHeader className='text-center'>
          <CardTitle className='text-green-800'>
            🎉 Request Submitted!
          </CardTitle>
          <CardDescription className='text-green-600'>
            Thank you for your interest in SinkSync beta! We'll review your
            application and get back to you soon.
          </CardDescription>
        </CardHeader>
        <CardContent className='text-center'>
          <p className='mb-4 text-green-700'>
            Keep an eye on your email for updates on your beta access status.
          </p>
          <Button
            onClick={() => (window.location.href = '/')}
            className='bg-green-600 text-white hover:bg-green-700'
          >
            Return Home
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='mx-auto w-full max-w-2xl border-pink-500/30 bg-white/10 backdrop-blur-sm'>
      <CardHeader className='text-center'>
        <CardTitle className='mb-2 text-3xl font-bold text-white'>
          🚀 SinkSync Beta Access
        </CardTitle>
        <CardDescription className='text-lg text-pink-300'>
          Request an invite code to join the exclusive SinkSync beta program
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* Name Field */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your full name'
                      {...field}
                      className='border-pink-500/50 bg-black/20 text-white placeholder:text-gray-400'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='your@email.com'
                      {...field}
                      className='border-pink-500/50 bg-black/20 text-white placeholder:text-gray-400'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Techdom Experience */}
            <FormField
              control={form.control}
              name='techdom_experience'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>
                    How experienced are you with techdom?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='border-pink-500/50 bg-black/20 text-white'>
                        <SelectValue placeholder='Select your experience level' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='beginner'>
                        Beginner - Just getting started
                      </SelectItem>
                      <SelectItem value='intermediate'>
                        Intermediate - Some experience
                      </SelectItem>
                      <SelectItem value='advanced'>
                        Advanced - Very experienced
                      </SelectItem>
                      <SelectItem value='expert'>
                        Expert - I live and breathe tech
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Spending Willingness */}
            <FormField
              control={form.control}
              name='spending_willingness'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>
                    How much are you willing to spend?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='border-pink-500/50 bg-black/20 text-white'>
                        <SelectValue placeholder='Select your spending preference' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='0'>
                        $0 - I can&apos;t spend anything
                      </SelectItem>
                      <SelectItem value='20-50'>$20-$50 per week</SelectItem>
                      <SelectItem value='60-100'>$60-$100 per week</SelectItem>
                      <SelectItem value='100-200'>
                        $100-$200 per week
                      </SelectItem>
                      <SelectItem value='unlimited'>
                        Sky&apos;s the limit
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Beta Reason */}
            <FormField
              control={form.control}
              name='beta_reason'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>
                    Why should you be a BETA tester?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us why you'd be perfect for the SinkSync beta program. What unique perspective or experience would you bring? How would you help us improve the product?"
                      className='min-h-[120px] border-pink-500/50 bg-black/20 text-white placeholder:text-gray-400'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className='text-gray-300'>
                    Minimum 50 characters. Be specific about your qualifications
                    and enthusiasm!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Error Message */}
            {error && (
              <div className='rounded-lg border border-red-500 bg-red-900/50 p-4 text-red-300'>
                {error}
              </div>
            )}

            {/* Submit Button or Status */}
            {hasAlreadyApplied ? (
              <div className='w-full rounded-md bg-gradient-to-r from-green-600 to-emerald-600 py-3 text-center text-lg font-semibold text-white'>
                <div className='flex items-center justify-center gap-2'>
                  <span className='text-xl'>⏳</span>
                  <span>Your application is being reviewed</span>
                </div>
                <div className='mt-1 text-sm opacity-90'>
                  We'll contact you once we've reviewed your submission
                </div>
              </div>
            ) : (
              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-pink-600 py-3 text-lg font-semibold text-white hover:bg-pink-700'
              >
                {isSubmitting ? (
                  <>
                    <span className='mr-2 animate-spin'>⏳</span>
                    Submitting Request...
                  </>
                ) : (
                  'Request Beta Access 🚀'
                )}
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
