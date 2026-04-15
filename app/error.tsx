'use client';

import HeaderSectionWrapper from "@/components/containers/HeaderSectionWrapper";
import ErrorSection from "@/components/errors/ErrorSection";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (<>
    <HeaderSectionWrapper ></HeaderSectionWrapper>
    <ErrorSection error={error} reset={reset} />
  </>
  );
}