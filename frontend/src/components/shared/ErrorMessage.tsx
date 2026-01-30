"use client";

import { Field } from "formik";

type Props = { name: string };

export default function ErrorMessage({ name }: Props) {
  return (
    <Field name={name}>
      {({ meta }: { meta: { error?: string; touched?: boolean } }) =>
        meta.touched && meta.error ? (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {meta.error}
          </p>
        ) : null
      }
    </Field>
  );
}
