import { useRouter } from "next/router";
import { useState } from "react";

const CATEGORY_COLORS = {
  Exam: "bg-blue-100 text-blue-700",
  Event: "bg-emerald-100 text-emerald-700",
  General: "bg-slate-100 text-slate-600",
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
    <div className={`relative bg-white rounded-2xl shadow border flex flex-col overflow-hidden transition hover:shadow-md ${notice.priority === "Urgent" ? "border-red-400" : "border-slate-200"}`}>
      {notice.priority === "Urgent" && <div className="h-1.5 bg-gradient-to-r from-red-500 to-orange-400 w-full" />}

      {notice.imageUrl && (
        <img src={notice.imageUrl} alt={notice.title} className="w-full h-44 object-cover" />
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          {notice.priority === "Urgent" && (
            <span className="text-xs font-bold bg-red-100 text-red-600 px-3 py-1 rounded-full border border-red-200">
              🔴 Urgent
            </span>
          )}
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${CATEGORY_COLORS[notice.category]}`}>
            {notice.category}
          </span>
          <span className="ml-auto text-xs text-slate-400 font-medium">{date}</span>
        </div>

        <h2 className="font-bold text-slate-800 text-base leading-snug">{notice.title}</h2>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">{notice.body}</p>

        <div className="flex gap-2 pt-3 border-t border-slate-100">
          <button
            onClick={() => router.push(`/notices/edit/${notice.id}`)}
            className="flex-1 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 py-2 rounded-xl transition-colors"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="flex-1 text-sm font-semibold text-red-500 hover:bg-red-50 py-2 rounded-xl transition-colors"
          >
            🗑 Delete
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="absolute inset-0 bg-white/96 backdrop-blur-sm flex flex-col items-center justify-center gap-5 p-6 rounded-2xl">
          <div className="text-center">
            <p className="text-2xl mb-2">🗑️</p>
            <p className="text-sm font-semibold text-slate-700">Delete this notice?</p>
            <p className="text-xs text-slate-400 mt-1">"{notice.title}"</p>
            <p className="text-xs text-slate-400">This cannot be undone.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-5 py-2 text-sm border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-5 py-2 text-sm bg-red-500 text-white rounded-xl hover:bg-red-600 disabled:opacity-60 font-semibold"
            >
              {deleting ? "Deleting..." : "Yes, Delete"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}