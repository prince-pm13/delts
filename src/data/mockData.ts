// Shared mock data for the entire app
export const mockPositions = [
  { id: 1, symbol: 'BTC-PERP', side: 'Long', leverage: '10x', size: 0.45, entryPrice: 62100.50, markPrice: 63240.10, liqPrice: 58200.00, margin: 2794.52, funding: -12.40, pnl: 512.82, roe: 18.35 },
  { id: 2, symbol: 'ETH-PERP', side: 'Short', leverage: '5x', size: 4.20, entryPrice: 2450.00, markPrice: 2435.20, liqPrice: 2720.00, margin: 2058.00, funding: -3.10, pnl: 62.16, roe: 3.02 },
  { id: 3, symbol: 'SOL-PERP', side: 'Long', leverage: '8x', size: 120, entryPrice: 142.30, markPrice: 148.75, liqPrice: 128.10, margin: 2134.50, funding: -8.22, pnl: 774.00, roe: 36.27 },
  { id: 4, symbol: 'DOGE-PERP', side: 'Short', leverage: '3x', size: 50000, entryPrice: 0.1240, markPrice: 0.1265, liqPrice: 0.1420, margin: 2066.67, funding: -1.05, pnl: -125.00, roe: -6.05 },
  { id: 5, symbol: 'AVAX-PERP', side: 'Long', leverage: '6x', size: 85, entryPrice: 34.50, markPrice: 36.10, liqPrice: 28.90, margin: 488.75, funding: -2.80, pnl: 136.00, roe: 27.82 },
];

export const mockOrders = [
  { id: 'ORD-28491', symbol: 'BTC-PERP', side: 'Buy', type: 'Limit', price: 61800.00, size: 0.10, filled: 0, status: 'Open', time: '2024-09-15 14:32:01' },
  { id: 'ORD-28490', symbol: 'ETH-PERP', side: 'Sell', type: 'Limit', price: 2480.00, size: 2.00, filled: 0, status: 'Open', time: '2024-09-15 14:28:45' },
  { id: 'ORD-28489', symbol: 'SOL-PERP', side: 'Buy', type: 'Stop Market', price: 150.00, size: 50, filled: 0, status: 'Open', time: '2024-09-15 13:55:12' },
  { id: 'ORD-28488', symbol: 'BTC-PERP', side: 'Sell', type: 'Take Profit', price: 65000.00, size: 0.45, filled: 0, status: 'Open', time: '2024-09-15 13:40:33' },
  { id: 'ORD-28485', symbol: 'BTC-PERP', side: 'Buy', type: 'Market', price: 62100.50, size: 0.45, filled: 0.45, status: 'Filled', time: '2024-09-15 12:15:08' },
  { id: 'ORD-28482', symbol: 'ETH-PERP', side: 'Sell', type: 'Market', price: 2450.00, size: 4.20, filled: 4.20, status: 'Filled', time: '2024-09-15 11:42:19' },
  { id: 'ORD-28479', symbol: 'DOGE-PERP', side: 'Sell', type: 'Limit', price: 0.1240, size: 50000, filled: 50000, status: 'Filled', time: '2024-09-15 10:30:55' },
  { id: 'ORD-28476', symbol: 'SOL-PERP', side: 'Buy', type: 'Market', price: 142.30, size: 120, filled: 120, status: 'Filled', time: '2024-09-15 09:18:41' },
  { id: 'ORD-28470', symbol: 'AVAX-PERP', side: 'Buy', type: 'Market', price: 34.50, size: 85, filled: 85, status: 'Filled', time: '2024-09-14 22:05:33' },
  { id: 'ORD-28465', symbol: 'BTC-PERP', side: 'Sell', type: 'Limit', price: 64500.00, size: 0.20, filled: 0, status: 'Cancelled', time: '2024-09-14 18:45:10' },
  { id: 'ORD-28460', symbol: 'ETH-PERP', side: 'Buy', type: 'Limit', price: 2380.00, size: 5.00, filled: 0, status: 'Cancelled', time: '2024-09-14 16:22:07' },
  { id: 'ORD-28455', symbol: 'SOL-PERP', side: 'Sell', type: 'Market', price: 138.90, size: 60, filled: 60, status: 'Filled', time: '2024-09-14 14:10:28' },
];

export const mockTradeHistory = [
  { id: 'TRD-91001', symbol: 'BTC-PERP', side: 'Buy', price: 62100.50, size: 0.45, fee: 5.59, pnl: null, time: '2024-09-15 12:15:08' },
  { id: 'TRD-91002', symbol: 'ETH-PERP', side: 'Sell', price: 2450.00, size: 4.20, fee: 2.06, pnl: null, time: '2024-09-15 11:42:19' },
  { id: 'TRD-91003', symbol: 'DOGE-PERP', side: 'Sell', price: 0.1240, size: 50000, fee: 1.24, pnl: null, time: '2024-09-15 10:30:55' },
  { id: 'TRD-91004', symbol: 'SOL-PERP', side: 'Buy', price: 142.30, size: 120, fee: 3.42, pnl: null, time: '2024-09-15 09:18:41' },
  { id: 'TRD-91005', symbol: 'AVAX-PERP', side: 'Buy', price: 34.50, size: 85, fee: 0.59, pnl: null, time: '2024-09-14 22:05:33' },
  { id: 'TRD-91006', symbol: 'SOL-PERP', side: 'Sell', price: 138.90, size: 60, fee: 1.67, pnl: -204.00, time: '2024-09-14 14:10:28' },
  { id: 'TRD-91007', symbol: 'BTC-PERP', side: 'Sell', price: 61500.00, size: 0.30, fee: 3.69, pnl: 320.10, time: '2024-09-14 10:05:12' },
  { id: 'TRD-91008', symbol: 'ETH-PERP', side: 'Buy', price: 2410.00, size: 3.00, fee: 1.45, pnl: -98.50, time: '2024-09-13 20:33:40' },
];
