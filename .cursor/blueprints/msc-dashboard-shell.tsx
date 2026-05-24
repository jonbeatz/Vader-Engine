/**
 * msc-dashboard-shell.tsx — Studio Dark dashboard shell stub
 * Wrap content in msc-viewport-shield + msc-shield-root
 */
export function MscDashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div className="msc-viewport-shield msc-shield-root msc-dashboard-container">
      {children}
    </motion.div>
  );
}
