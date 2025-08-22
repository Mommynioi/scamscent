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
import { ArrowLeft, ArrowRight } from 'lucide-react';

import {
  hasCompletedApplication,
  setApplicationCompletedCookie
} from '@/lib/application-cookies';

const formSchema = z.object({
  twitter_username: z
    .string()
    .min(1, 'Twitter username is required')
    .regex(/^@[\w]+$/, 'Please use format @username'),
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

const TOTAL_STEPS = 5;

export default function SinkSyncPage() {
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fadeClass, setFadeClass] = useState('opacity-100');
  const [hasAlreadyApplied, setHasAlreadyApplied] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      twitter_username: '@',
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

  const watchedValues = form.watch();

  const handleApplyClick = () => {
    setFadeClass('opacity-0');
    setTimeout(() => {
      setShowForm(true);
      setFadeClass('opacity-100');
    }, 300);
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return (
          !!watchedValues.twitter_username &&
          watchedValues.twitter_username !== '@' &&
          /^@[\w]+$/.test(watchedValues.twitter_username)
        );
      case 2:
        return (
          !!watchedValues.email &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedValues.email)
        );
      case 3:
        return !!watchedValues.techdom_experience;
      case 4:
        return !!watchedValues.spending_willingness;
      case 5:
        return (
          !!watchedValues.beta_reason && watchedValues.beta_reason.length >= 50
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS && isStepValid(currentStep)) {
      setFadeClass('opacity-0');
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setFadeClass('opacity-100');
      }, 150);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setFadeClass('opacity-0');
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setFadeClass('opacity-100');
      }, 150);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      console.log('Form data:', data);

      // Submit to Supabase
      const { database } = await import('@/lib/database');
      await database.submitInviteRequest({
        name: data.twitter_username, // Using twitter username as name
        email: data.email,
        techdom_experience: data.techdom_experience,
        spending_willingness: data.spending_willingness,
        beta_reason: data.beta_reason
      });

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

  const getCurrentStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormField
            control={form.control}
            name='twitter_username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-2xl font-semibold text-white'>
                  What&apos;s your X username?
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='@username'
                    value={field.value || '@'}
                    onChange={field.onChange}
                    className='border-pink-500/50 bg-black/20 py-4 text-xl text-white placeholder:text-gray-400'
                  />
                </FormControl>
                <FormDescription className='text-lg text-gray-300'>
                  Enter your X (Twitter) username including the @ symbol
                </FormDescription>
                {form.formState.errors.twitter_username && (
                  <div className='mt-2 text-sm text-pink-300'>
                    {form.formState.errors.twitter_username.message}
                  </div>
                )}
              </FormItem>
            )}
          />
        );

      case 2:
        return (
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-2xl font-semibold text-white'>
                  What&apos;s your email address?
                </FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='your@email.com'
                    value={field.value || ''}
                    onChange={field.onChange}
                    className='border-pink-500/50 bg-black/20 py-4 text-xl text-white placeholder:text-gray-400'
                  />
                </FormControl>
                <FormDescription className='text-lg text-gray-300'>
                  Mommy will use this to send you your invite code (maybe)
                </FormDescription>
                {form.formState.errors.email && (
                  <div className='mt-2 text-sm text-pink-300'>
                    {form.formState.errors.email.message}
                  </div>
                )}
              </FormItem>
            )}
          />
        );

      case 3:
        return (
          <FormField
            control={form.control}
            name='techdom_experience'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-2xl font-semibold text-white'>
                  How experienced are you with techdom?
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className='border-pink-500/50 bg-black/20 py-4 text-xl text-white'>
                      <SelectValue placeholder='Select your experience level' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='border-pink-500/50 bg-gray-900'>
                    <SelectItem
                      value='beginner'
                      className='text-white hover:bg-pink-600/20'
                    >
                      Beginner - Just getting started
                    </SelectItem>
                    <SelectItem
                      value='intermediate'
                      className='text-white hover:bg-pink-600/20'
                    >
                      Intermediate - Some experience
                    </SelectItem>
                    <SelectItem
                      value='advanced'
                      className='text-white hover:bg-pink-600/20'
                    >
                      Advanced - Very experienced
                    </SelectItem>
                    <SelectItem
                      value='expert'
                      className='text-white hover:bg-pink-600/20'
                    >
                      Expert - Complete clickslut, my PFP changes daily
                    </SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.techdom_experience && (
                  <div className='mt-2 text-sm text-pink-300'>
                    {form.formState.errors.techdom_experience.message}
                  </div>
                )}
              </FormItem>
            )}
          />
        );

      case 4:
        return (
          <FormField
            control={form.control}
            name='spending_willingness'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-2xl font-semibold text-white'>
                  How much are you willing to spend?
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className='border-pink-500/50 bg-black/20 py-4 text-xl text-white'>
                      <SelectValue placeholder='Select your spending preference' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='border-pink-500/50 bg-gray-900'>
                    <SelectItem
                      value='0'
                      className='text-white hover:bg-pink-600/20'
                    >
                      $0 - I can&apos;t spend anything
                    </SelectItem>
                    <SelectItem
                      value='20-50'
                      className='text-white hover:bg-pink-600/20'
                    >
                      $20 to $50 each week
                    </SelectItem>
                    <SelectItem
                      value='60-100'
                      className='text-white hover:bg-pink-600/20'
                    >
                      $60 to $100 each week
                    </SelectItem>
                    <SelectItem
                      value='100-200'
                      className='text-white hover:bg-pink-600/20'
                    >
                      $100 to $200 each week
                    </SelectItem>
                    <SelectItem
                      value='unlimited'
                      className='text-white hover:bg-pink-600/20'
                    >
                      Any amount Mommy asks for
                    </SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.spending_willingness && (
                  <div className='mt-2 text-sm text-pink-300'>
                    {form.formState.errors.spending_willingness.message}
                  </div>
                )}
              </FormItem>
            )}
          />
        );

      case 5:
        return (
          <FormField
            control={form.control}
            name='beta_reason'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-2xl font-semibold text-white'>
                  Why should you be a BETA tester?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us why you'd be perfect for the SinkSync beta program. What unique perspective or experience would you bring? How would you help us improve the product?"
                    className='min-h-[200px] border-pink-500/50 bg-black/20 text-lg text-white placeholder:text-gray-400'
                    value={field.value || ''}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription className='text-lg text-gray-300'>
                  Minimum 50 characters. Why should Mommy choose you? Be
                  specific and creative.
                </FormDescription>
                {form.formState.errors.beta_reason && (
                  <div className='mt-2 text-sm text-pink-300'>
                    {form.formState.errors.beta_reason.message}
                  </div>
                )}
              </FormItem>
            )}
          />
        );

      default:
        return null;
    }
  };

  // Show success message only for fresh submissions, not for returning users
  if (isSubmitted) {
    return (
      <div className='flex h-full items-center justify-center p-8'>
        <Card className='mx-auto w-full max-w-2xl border-green-200 bg-green-50'>
          <CardHeader className='text-center'>
            <CardTitle className='text-green-800'>
              🎉 Request Submitted!
            </CardTitle>
            <CardDescription className='text-green-600'>
              Thank you for your interest in SinkSync, beta! Mommy will review
              your application and get back to you soon.
            </CardDescription>
          </CardHeader>
          <CardContent className='text-center'>
            <p className='mb-4 text-green-700'>
              Mommy will contact you once she's reviewed your submission.
            </p>
            <Button
              onClick={() => (window.location.href = '/')}
              className='bg-green-600 text-white hover:bg-green-700'
            >
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className='flex h-full items-center justify-center p-8'>
        <div
          className={`w-full max-w-4xl transition-opacity duration-300 ${fadeClass}`}
        >
          <Card className='border-pink-500/30 bg-white/10 backdrop-blur-sm'>
            <CardHeader className='text-center'>
              <div className='mb-4 flex items-center justify-between'>
                <div className='text-lg text-pink-300'>
                  Step {currentStep} of {TOTAL_STEPS}
                </div>
                <div className='h-2 w-64 rounded-full bg-gray-700'>
                  <div
                    className='h-2 rounded-full bg-pink-500 transition-all duration-300'
                    style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className='px-12 pb-12'>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-8'
                >
                  <div
                    key={currentStep}
                    className={`transition-opacity duration-150 ${fadeClass}`}
                  >
                    {getCurrentStepContent()}
                  </div>

                  {error && (
                    <div className='rounded-lg border border-red-500 bg-red-900/50 p-4 text-red-300'>
                      {error}
                    </div>
                  )}

                  <div className='flex justify-between pt-8'>
                    <Button
                      type='button'
                      onClick={handleBack}
                      disabled={currentStep === 1}
                      variant='outline'
                      className='border-gray-500 text-gray-300 hover:bg-gray-700'
                    >
                      <ArrowLeft className='mr-2 h-4 w-4' />
                      Back
                    </Button>

                    {currentStep === TOTAL_STEPS ? (
                      <Button
                        type='submit'
                        disabled={isSubmitting || !isStepValid(currentStep)}
                        className='bg-pink-600 px-8 font-semibold text-white hover:bg-pink-700'
                      >
                        {isSubmitting ? (
                          <>
                            <span className='mr-2 animate-spin'>⏳</span>
                            Submitting...
                          </>
                        ) : (
                          'Submit Application 🚀'
                        )}
                      </Button>
                    ) : (
                      <Button
                        type='button'
                        onClick={handleNext}
                        disabled={!isStepValid(currentStep)}
                        className='bg-pink-600 px-8 font-semibold text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:bg-gray-600'
                      >
                        Next
                        <ArrowRight className='ml-2 h-4 w-4' />
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className='h-full'>
      <div className={`h-full transition-opacity duration-300 ${fadeClass}`}>
        <div className='container mx-auto h-full px-8 py-8'>
          <div className='grid h-full grid-cols-1 items-center gap-8 lg:grid-cols-2'>
            {/* Left Side - Image */}
            <div className='flex items-center justify-center'>
              <div className='w-full max-w-md'>
                <div className='flex aspect-square items-center justify-center overflow-hidden rounded-3xl shadow-2xl'>
                  <img
                    src='/assets/logo.png'
                    alt='SinkSync Logo'
                    className='h-full w-full object-cover'
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Cards */}
            <div className='space-y-8'>
              <div className='mb-12 text-center lg:text-left'>
                <h1 className='mb-4 font-[family-name:var(--font-rise-and-shine)] text-5xl text-white'>
                  Join the Future
                </h1>
                <p className='text-xl text-pink-300'>
                  Experience Mommy Nioi's revolutionary sync technology
                </p>
              </div>

              {/* Apply Button or Status */}
              <div className='mb-8'>
                {hasAlreadyApplied ? (
                  <div className='w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 py-6 text-center text-xl font-bold text-white shadow-lg'>
                    <div className='flex items-center justify-center gap-3'>
                      <span className='text-2xl'>⏳</span>
                      <span>Your application is being reviewed</span>
                    </div>
                    <div className='mt-2 text-sm opacity-90'>
                      Mommy will contact you once she's reviewed your submission
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={handleApplyClick}
                    className='w-full transform rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 py-6 text-xl font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-pink-700 hover:to-purple-700'
                  >
                    Apply for Invite Code ✨
                  </Button>
                )}
              </div>

              {/* Benefits Cards */}
              <div className='space-y-6'>
                <div className='rounded-xl border border-purple-500/30 bg-white/10 p-6 backdrop-blur-sm'>
                  <h3 className='mb-3 text-2xl font-semibold text-white'>
                    🎯 Early Access
                  </h3>
                  <p className='text-lg text-gray-300'>
                    Become a test subject for Mommy to fine tune SinkSync&apos;s
                    proprietary algorithm.
                  </p>
                </div>

                <div className='rounded-xl border border-pink-500/30 bg-white/10 p-6 backdrop-blur-sm'>
                  <h3 className='mb-3 text-2xl font-semibold text-white'>
                    💝 Exclusive Perks
                  </h3>
                  <p className='text-lg text-gray-300'>
                    Mommy will spoil you with gifts and special perks.
                  </p>
                </div>

                <div className='rounded-xl border border-indigo-500/30 bg-white/10 p-6 backdrop-blur-sm'>
                  <h3 className='mb-3 text-2xl font-semibold text-white'>
                    🎮 Shape the Future
                  </h3>
                  <p className='text-lg text-gray-300'>
                    Mommy will use your feedback to improve SinkSync and make it
                    even better.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
