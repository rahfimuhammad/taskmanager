import { useEffect, useState } from "react";

export const IsSmallScreen = () => {
    const [isSmall, setIsSmall] = useState<boolean | null>(null);

    useEffect(() => {
        const detectOrientation = () => {
            setIsSmall(window.innerWidth < 500);
        };

        detectOrientation();
        window.addEventListener('resize', detectOrientation);

        return () => {
            window.removeEventListener('resize', detectOrientation);
        };
    }, []);

    return isSmall;
};
