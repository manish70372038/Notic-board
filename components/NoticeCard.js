import { useRouter } from "next/router";
import { useState } from "react";

const CATEGORY_COLORS = {
  Exam: "bg-blue-100 text-blue-700 border-blue-200",
  Event: "bg-green-100 text-green-700 border-green-200",
  General: "bg-gray-100 text-gray-600 border-gray-200",
};

export default function NoticeCard({ notice, onDeleted }) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/notices/${notice.id}`, { method: "DELETE" });
      if (res.ok) {
        onDeleted(notice.id);
      } else {
        alert("Failed to delete notice.");
      }
    } catch {
      alert("Something went wrong.");
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  const formattedDate = new Date(notice.publishDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-sm border overflow-hidden flex flex-col transition-all hover:shadow-md ${
        notice.priority === "Urgent" ? "border-red-300" : "border-gray-200"
      }`}
    >
      {/* Urgent stripe */}
      {notice.priority === "Urgent" && (
        <div className="h-1.5 w-full bg-red-500" />
      )}

      {/* Image */}
      {notice.imageUrl && (
        <div className="w-full h-44 overflow-hidden bg-gray-100">
          <img
            src={notice.imageUrl}
            alt={notice.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Badges row */}
        <div className="flex items-center gap-2 flex-wrap">
          {notice.priority === "Urgent" && (
            <span className="text-xs font-bold uppercase tracking-wider bg-red-100 text-red-600 border border-red-200 rounded-full px-2.5 py-0.5">
              🔴 Urgent
            </span>
          )}
          <span
            className={`text-xs font-medium border rounded-full px-2.5 py-0.5 ${
              CATEGORY_COLORS[notice.category]
            }`}
          >
            {notice.category}
          </span>
          <span className="ml-auto text-xs text-gray-400">{formattedDate}</span>
        </div>

        {/* Title */}
        <h2 className="text-base font-semibold text-gray-800 leading-snug">
          {notice.title}
        </h2>

        {/* Body */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {notice.body}
        </p>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={() => router.push(`/notices/edit/${notice.id}`)}
            className="flex-1 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg py-1.5 transition-colors"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="flex-1 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg py-1.5 transition-colors"
          >
            🗑 Delete
          </button>
        </div>
      </div>

      {/* Confirmation overlay */}
      {showConfirm && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4 p-6 rounded-2xl">
          <p className="text-center text-gray-700 font-medium text-sm">
            Delete <span className="text-gray-900 font-semibold">"{notice.title}"</span>?
            <br />
            <span className="text-gray-400 text-xs">This action cannot be undone.</span>
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-60"
            >
              {deleting ? "Deleting..." : "Yes, Delete"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
