import { useState } from 'react';
import EntryLogin from './_partials/EntryLogin';
import EntryMenu from './_partials/EntryMenu';

const EntryContainer = () => {
    const [loginStatus, setLoginStatus] = useState<boolean>(false);

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-fill" />
            </div>
            <div className="absolute p-8 text-3xl font-bold font-mono">
                {/* logo */}
                IAMPAM
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />

                {loginStatus ? <EntryMenu /> : <EntryLogin setLoginStatus={setLoginStatus} />}
            </div>
        </div>
    );
};

export default EntryContainer;
