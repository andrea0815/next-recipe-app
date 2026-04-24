import Button from '@/components/buttons/Button';
import PageHeadline from '@/components/typography/PageHeadline';
import { SignOutButton } from '@clerk/nextjs';
import {
  UserProfile
} from "@clerk/nextjs";

import ProfileSettings from './ProfileSettings';
import Footer from '@/components/footer/Footer';

export default function SettingsSectionSkeleton() {
  return (
    <>
      <PageHeadline>Settings</PageHeadline>
      <div className='w-full flex flex-col justify-center items-center gap-10 mt-6'>

        <ProfileSettings
          recipePublicByDefault={true}
        />

        <div className="w-full flex justify-center items-center">
          <div className="h-200 w-full rounded-lg bg-gray-200 animate-pulse"></div>
        </div>
        <div className='max-w-200 w-full'>
          <SignOutButton>
            <Button
              color='red'
              stretch={true}
              customClass='w-full'
            >Sign out</Button>
          </SignOutButton>
        </div>
      </div>

      <Footer />
    </>
  );
}
