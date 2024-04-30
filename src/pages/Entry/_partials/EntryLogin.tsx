import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { useEffect, useState } from 'react';
import { setPageTitle, toggleRTL } from '@/store/themeConfigSlice';
import IconMail from '@/components/Icon/IconMail';
import IconLockDots from '@/components/Icon/IconLockDots';
import IconInstagram from '@/components/Icon/IconInstagram';
import IconFacebookCircle from '@/components/Icon/IconFacebookCircle';
import IconTwitter from '@/components/Icon/IconTwitter';
import IconGoogle from '@/components/Icon/IconGoogle';

const EntryLogin = (props: any) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login Boxed'));
    });
    const navigate = useNavigate();

    // const [isLogin, setIsLogin] = useState<boolean>(false);

    const submitForm = () => {
        props.setLoginStatus(true);
    };

    return (
        <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
            <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                <div className="mx-auto w-full max-w-[440px]">
                    <div className="mb-10">
                        <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                        <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                    </div>
                    <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
                        <div>
                            <label htmlFor="Email">Email</label>
                            <div className="relative text-white-dark">
                                <input id="Email" type="email" placeholder="Enter Email" className="form-input ps-10 placeholder:text-white-dark" />
                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                    <IconMail fill={true} />
                                </span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="Password">Password</label>
                            <div className="relative text-white-dark">
                                <input id="Password" type="password" placeholder="Enter Password" className="form-input ps-10 placeholder:text-white-dark" />
                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                    <IconLockDots fill={true} />
                                </span>
                            </div>
                        </div>
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                <span className="text-white-dark">Subscribe to weekly newsletter</span>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                            Sign in
                        </button>
                    </form>
                    <div className="relative my-7 text-center md:mb-9">
                        <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                        <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                    </div>
                    <div className="mb-10 md:mb-[60px]">
                        <ul className="flex justify-center gap-3.5 text-white">
                            <li>
                                <Link
                                    to="#"
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                    style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                >
                                    <IconInstagram />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                    style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                >
                                    <IconFacebookCircle />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                    style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                >
                                    <IconTwitter fill={true} />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                    style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                >
                                    <IconGoogle />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="text-center dark:text-white">
                        Don't have an account ?&nbsp;
                        <Link to="/auth/boxed-signup" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                            SIGN UP
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EntryLogin;