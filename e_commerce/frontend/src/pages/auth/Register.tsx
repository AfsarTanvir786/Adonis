import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authService } from '@/services/api/authService';
import type { User } from '@/types/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

function validateName(name: string): { isValid: boolean; error: string } {
    if (!name.trim()) {
        return { isValid: false, error: 'Name is required' };
    }
    if (name.trim().length < 2) {
        return { isValid: false, error: 'Name must be at least 2 characters' };
    }
    if (/\d/.test(name)) {
        return { isValid: false, error: 'Name cannot contain numbers' };
    }
    if (!/^[a-zA-Z.\s]+$/.test(name)) {
        return {
            isValid: false,
            error: 'Name can only contain letters, spaces and .(Dot)',
        };
    }
    return { isValid: true, error: '' };
}

function validateEmail(email: string): { isValid: boolean; error: string } {
    if (!email.trim()) {
        return { isValid: false, error: 'Email is required' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Please enter a valid email address' };
    }
    return { isValid: true, error: '' };
}

function validateConfirmPassword(
    password: string,
    confirmPass: string
): { isValid: boolean; error: string } {
    if (!confirmPass) {
        return { isValid: false, error: 'Please confirm your password' };
    }
    if (password !== confirmPass) {
        return { isValid: false, error: 'Passwords do not match' };
    }
    return { isValid: true, error: '' };
}

function Register() {
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset } = useForm<Partial<User>>();

    const { mutate, isPending, error } = useMutation({
        mutationFn: (data: Partial<User>) => authService.register(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auth'] });
            reset();
        },
    });
    const navigate = useNavigate();

    const onSubmit = (data: Partial<User>) => {
        if (!data.email) {
            return alert('Please Enter userName');
        }

        if (!data.password) {
            return alert('Please enter a password');
        }

        console.log(data);

        mutate(data);
        navigate('/products');
    };

    return (
        <div className="min-h-dvh bg-white">
            <div className="flex min-h-full min-w-dvw bg-[#f5f5f5] flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto dark:hidden"
                    />
                    <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                        className="mx-auto h-10 w-auto not-dark:hidden"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
                        Create Account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Name Section */}
                        <div>
                            <label className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                                Name
                            </label>
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    {...register('fullName')}
                                    placeholder="Please enter you name"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Email Section */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <Input
                                    {...register('email')}
                                    type="email"
                                    placeholder="Please enter your email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Password Section */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                                >
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a
                                        href="/auth/reset-password"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <Input
                                    {...register('password')}
                                    type="password"
                                    placeholder="Please enter your password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Confirm Password Section */}
                        <div>
                            <label className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                                Confirm Password
                            </label>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    placeholder="Confirm your password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Reset, Cancel Buttons, Register */}
                        <div className="flex w-full justify-center gap-10">
                            <Button
                                className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                                type="button"
                            >
                                cancel
                            </Button>
                            <Button
                                disabled={isPending}
                                type="submit"
                                className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                            >
                                {isPending ? 'pending' : 'Register'}
                            </Button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
                        Already have an account?{'  '}
                        <Link
                            to="/auth/login"
                            className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                            Login here
                        </Link>
                    </p>
                    {error && (
                        <p className="text-red-500 text-center mt-4">
                            Please enter valid credentials to create an account.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Register;
