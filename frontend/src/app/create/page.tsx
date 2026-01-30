"use client";

import PageLayout from "@/components/shared/PageLayout";
import CreateQuizForm from "@/components/createPage/CreateQuizForm";

export default function CreateQuizPage() {
  return (
    <PageLayout backHref="/" backLabel="Home" title="Create Quiz">
      <CreateQuizForm />
    </PageLayout>
  );
}
