/**
 * Formats a number to IDR currency format
 * @param {number} amount
 * @returns {string} e.g. "Rp 150.000"
 */
export const formatIDR = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formats a given date string to Indonesian format
 * @param {string | Date} date
 * @returns {string} e.g. "25 Apr 2026"
 */
export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
};

/**
 * Returns the number of days remaining until the due date
 * @param {string | Date} dueDate
 * @returns {number} positive for future, negative for past/overdue
 */
export const getDaysUntilDue = (dueDate) => {
  if (!dueDate) return 0;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const target = new Date(dueDate);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};
