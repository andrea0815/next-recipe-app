import Button from '@/components/buttons/Button';
import PageHeadline from '@/components/typography/PageHeadline';
import { getCurrentDbUser } from '@/lib/auth/getCurrentDbUser';
import { SignOutButton } from '@clerk/nextjs';
import {
    UserProfile
} from "@clerk/nextjs";

import ProfileSettings from './ProfileSettings';
import Footer from '@/components/footer/Footer';
import SettingsSection from './SettingsSection';
import SettingsSectionSkeleton from './SettingsSectionSkeleton';

export default async function ProfileAccountPage() {

    const user = await getCurrentDbUser();

    if (!user) {
        throw new Error("You must be signed in.");
    }

    return (
        <>
            <SettingsSection publicPerDefault={user.recipe_public_by_default ?? false} />
        </>
    );
}
