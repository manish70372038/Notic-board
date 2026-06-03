import { useRouter } from "next/router";
import { useState } from "react";

const CATEGORY_COLORS = {
  Exam: "bg-blue-100 text-blue-700",
  Event: "bg-green-100 text-green-700",
  General: "bg-gray-100 text-gray-600",
};

export default function NoticeCard({ notice, onDeleted }) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    const res = await fetch(`/api/notices/${notice.id}`, { method: "DELETE" });
    if (res.ok) onDeleted(notice.id);
    else alert("Failed to delete.");
    setDeleting(false);
    setShowConfirm(false);
  };

  const date = new Date(notice.publishDate).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });

  return (
    <div className={`relative bg-white rounded-xl shadow-sm border flex flex-col overflow-hidden ${notice.priority === "Urgent" ? "border-red-400" : "border-slate-200"}`}>
      {notice.priority === "Urgent" && <div className="h-1 bg-red-500 w-full" />}

      {notice.imageUrl && (
        <img src={notice.imageUrl} alt={notice.title} className="w-full h-40 object-cover" />
      )}

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          {notice.priority === "Urgent" && (
            <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">🔴 Urgent</span>
          )}
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[notice.category]}`}>
            {notice.category}
          </span>
          <span className="ml-auto text-xs text-slate-400">{date}</span>
        </div>

        <h2 className="font-semibold text-slate-800 text-sm leading-snug">{notice.title}</h2>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 flex-1">{notice.body}</p>

        <div className="flex gap-2 pt-2 border-t border-slate-100 mt-1">
          <button
            onClick={() => router.push(`/notices/edit/${notice.id}`)}
            className="flex-1 text-xs font-medium text-indigo-600 hover:bg-indigo-50 py-1.5 rounded-lg transition-colors"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="flex-1 text-xs font-medium text-red-500 hover:bg-red-50 py-1.5 rounded-lg transition-colors"
          >
            🗑 Delete
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center gap-4 p-6 rounded-xl">
          <p className="text-center text-sm text-slate-700">
            Delete <span className="font-semibold">"{notice.title}"</span>?
            <br /><span className="text-xs text-slate-400">This cannot be undone.</span>
          </p>
          <div className="flex gap-3">
            <button onClick={() => setShowConfirm(false)} className="px-4 py-1.5 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={handleDelete} disabled={deleting} className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-60">
              {deleting ? "Deleting..." : "Yes, Delete"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}