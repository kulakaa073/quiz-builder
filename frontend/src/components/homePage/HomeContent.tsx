"use client";

import Link from "next/link";

export default function HomeContent() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Quiz Builder
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Create and manage quizzes with True/False, short answer, and multiple-choice questions.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/create"
            className="rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create quiz
          </Link>
          <Link
            href="/quizzes"
            className="rounded-md border border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            View quizzes
          </Link>
        </div>

        <ul className="mt-12 text-left space-y-3 text-slate-600 sm:max-w-md sm:mx-auto">
          <li className="flex items-start gap-2">
            <span className="text-indigo-600 mt-0.5" aria-hidden>•</span>
            <span>Create quizzes with a title and one or more questions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-600 mt-0.5" aria-hidden>•</span>
            <span>Use True/False, short text answer, or multiple choice (several correct)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-600 mt-0.5" aria-hidden>•</span>
            <span>Browse all quizzes, open details, or delete when you’re done</span>
          </li>
        </ul>
      </div>
    </main>
  );
}
