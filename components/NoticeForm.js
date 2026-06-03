import { useState } from "react";
import { useRouter } from "next/router";

const defaultValues = {
  title: "",
  body: "",
  category: "General",
  priority: "Normal",
  publishDate: "",
  imageUrl: "",
};

export default function NoticeForm({ initial = defaultValues, noticeId = null }) {
  const router = useRouter();
  const isEdit = noticeId !== null;

  const [form, setForm] = useState({
    ...defaultValues,
    ...initial,
    publishDate: initial.publishDate
      ? new Date(initial.publishDate).toISOString().split("T")[0]
      : "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    const url = isEdit ? `/api/notices/${noticeId}` : "/api/notices";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ _global: data.error || "Something went wrong." });
        }
        return;
      }

      router.push("/");
    } catch {
      setErrors({ _global: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition";
  const errorClass = "text-red-500 text-xs mt-1";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {errors._global && (
        <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 border border-red-200">
          {errors._global}
        </div>
      )}

      {/* Title */}
      <div>
        <label htmlFor="title" className={labelClass}>
          Title <span className="text-red-400">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Notice title"
          className={inputClass}
        />
        {errors.title && <p className={errorClass}>{errors.title}</p>}
      </div>

      {/* Body */}
      <div>
        <label htmlFor="body" className={labelClass}>
          Body <span className="text-red-400">*</span>
        </label>
        <textarea
          id="body"
          name="body"
          rows={4}
          value={form.body}
          onChange={handleChange}
          placeholder="Describe the notice..."
          className={`${inputClass} resize-none`}
        />
        {errors.body && <p className={errorClass}>{errors.body}</p>}
      </div>

      {/* Category + Priority */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className={labelClass}>
            Category
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="General">General</option>
            <option value="Exam">Exam</option>
            <option value="Event">Event</option>
          </select>
          {errors.category && <p className={errorClass}>{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="priority" className={labelClass}>
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
          </select>
          {errors.priority && <p className={errorClass}>{errors.priority}</p>}
        </div>
      </div>

      {/* Publish Date */}
      <div>
        <label htmlFor="publishDate" className={labelClass}>
          Publish Date <span className="text-red-400">*</span>
        </label>
        <input
          id="publishDate"
          name="publishDate"
          type="date"
          value={form.publishDate}
          onChange={handleChange}
          className={inputClass}
        />
        {errors.publishDate && <p className={errorClass}>{errors.publishDate}</p>}
      </div>

      {/* Image URL (bonus) */}
      <div>
        <label htmlFor="imageUrl" className={labelClass}>
          Image URL{" "}
          <span className="text-gray-400 font-normal text-xs">(optional)</span>
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="https://..."
          className={inputClass}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex-1 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium py-2.5 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 rounded-xl bg-indigo-600 text-white text-sm font-semibold py-2.5 hover:bg-indigo-700 transition-colors disabled:opacity-60"
        >
          {submitting
            ? isEdit
              ? "Saving..."
              : "Creating..."
            : isEdit
            ? "Save Changes"
            : "Create Notice"}
        </button>
      </div>
    </form>
  );
}
