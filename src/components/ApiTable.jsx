

export const ApiTable = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/30 my-4 shadow-sm">
      <table className="w-full text-left text-xs border-collapse min-w-[560px]">
        <thead className="bg-slate-100/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 uppercase font-mono text-[11px] border-b border-slate-200 dark:border-slate-800">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="p-3.5 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 font-sans">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              {row.map((cell, j) => (
                <td key={j} className="p-3.5 text-slate-700 dark:text-slate-300 leading-normal">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};