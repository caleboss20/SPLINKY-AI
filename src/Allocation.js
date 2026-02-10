// =======================
// Driver Allocation Logic
// Using system of linear equations
// =======================
// 1️⃣ Extract number from user input
export function extractTotalDrivers(message) {
  if (!message) return null;
  const match = message.match(/\d+/);
  return match ? Number(match[0]) : null;
}
// 2️⃣ Solve system of equations
export function allocateDrivers(total) {
  if (!total || total <= 0) return null;
  // Solve step-by-step like a real system:
  // Equations:
  // x + y + z + w = total
  // y = 2x
  // z = x + 10
  // w = y / 2 = x
  // Substitute all in total equation:
  // x + 2x + (x+10) + x = total
  // 5x + 10 = total
  const x = (total - 10) / 5;
  const y = 2 * x;      // B
  const z = x + 10;     // C
  const w = y / 2;      // D
  return {
    A: Math.round(x),
    B: Math.round(y),
    C: Math.round(z),
    D: Math.round(w),
  };
}
// 3️⃣ Generate chatbot message
export function formatAllocationMessage(allocation) {
  if (!allocation) return "Please provide a valid number of drivers.";
  return `🚗 Driver Allocation Result:
• Zone A: ${allocation.A} drivers
• Zone B: ${allocation.B} drivers
• Zone C: ${allocation.C} drivers
• Zone D: ${allocation.D} drivers`;
}
// 4️⃣ Full helper for chatbot
export function handleDriverAllocation(message) {
  const total = extractTotalDrivers(message);
  const allocation = allocateDrivers(total);
  return formatAllocationMessage(allocation);
}