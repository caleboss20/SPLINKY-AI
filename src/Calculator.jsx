import { useState, useRef, useEffect } from 'react';

const Calculator = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemCost, setItemCost] = useState('');
  const [bottleCount, setBottleCount] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [exchangeRate, setExchangeRate] = useState('15');
  const [showModal, setShowModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const itemNameInputRef = useRef(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('yoghurtCalculatorHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error loading history:', error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('yoghurtCalculatorHistory', JSON.stringify(history));
  }, [history]);

  const totalProductionCost = items.reduce((sum, item) => sum + (parseFloat(item.cost) || 0), 0);
  const totalRevenue = (parseFloat(bottleCount) || 0) * (parseFloat(sellingPrice) || 0);
  const totalProfit = totalRevenue - totalProductionCost;
  const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  const profitInUSD = totalProfit / (parseFloat(exchangeRate) || 1);

  useEffect(() => {
    if (showModal && itemNameInputRef.current) {
      itemNameInputRef.current.focus();
    }
  }, [showModal]);

  const handleAddItem = () => {
    if (itemName.trim() && itemCost.trim()) {
      const cost = parseFloat(itemCost);
      if (cost >= 0) {
        setItems([...items, { id: Date.now(), name: itemName, cost }]);
        setItemName('');
        setItemCost('');
        setShowModal(false);
      }
    }
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSaveCalculation = () => {
    if (items.length === 0 || !bottleCount || !sellingPrice) {
      alert('Please fill in all fields before saving');
      return;
    }

    const calculation = {
      id: Date.now(),
      date: new Date().toLocaleString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      items: items,
      bottleCount: parseFloat(bottleCount),
      sellingPrice: parseFloat(sellingPrice),
      exchangeRate: parseFloat(exchangeRate),
      totalProductionCost: totalProductionCost,
      totalRevenue: totalRevenue,
      totalProfit: totalProfit,
      profitMargin: profitMargin,
      profitInUSD: profitInUSD
    };

    setHistory([calculation, ...history]);
    handleReset();
    alert('Calculation saved to history!');
  };

  const handleLoadCalculation = (calc) => {
    setItems(calc.items);
    setBottleCount(calc.bottleCount.toString());
    setSellingPrice(calc.sellingPrice.toString());
    setExchangeRate(calc.exchangeRate.toString());
    setShowHistory(false);
  };

  const handleDeleteHistory = (id) => {
    if (confirm('Are you sure you want to delete this calculation?')) {
      setHistory(history.filter(h => h.id !== id));
    }
  };

  const handleClearAllHistory = () => {
    if (confirm('Are you sure you want to clear all history? This cannot be undone.')) {
      setHistory([]);
    }
  };

  const handleReset = () => {
    setItems([]);
    setItemName('');
    setItemCost('');
    setBottleCount('');
    setSellingPrice('');
    setExchangeRate('15');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    setItemName('');
    setItemCost('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setItemName('');
    setItemCost('');
  };

  const isPositiveProfit = totalProfit >= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-5xl font-bold text-amber-900 mb-2">
               Yoghurt Calculator
            </h1>
            <p className="text-amber-700 text-lg">Professional profit analysis for your yoghurt business</p>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-xl transition transform hover:scale-105 active:scale-95 flex items-center gap-2 h-fit"
          >
            <span className="text-xl">📋</span> History ({history.length})
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Production Costs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Production Cost Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-amber-500">
            <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">📦</span> Production Costs
            </h2>
            
            <button
              onClick={handleOpenModal}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mb-6"
            >
              <span className="text-xl">+</span> Add Item
            </button>

            {/* Items List */}
            <div className="space-y-2">
              {items.length === 0 ? (
                <p className="text-gray-500 text-center py-8 italic">No items added yet. Click "Add Item" to start.</p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border-l-4 border-amber-500 hover:shadow-md transition"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">₵ {item.cost.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition text-2xl font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Total Production Cost */}
            <div className="mt-6 bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-lg border-2 border-amber-300">
              <p className="text-gray-600 text-sm mb-1">Total Production Cost</p>
              <p className="text-3xl font-bold text-amber-900">₵ {totalProductionCost.toFixed(2)}</p>
            </div>
          </div>

          {/* Sales Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-blue-500">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">💰</span> Sales Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bottles Produced</label>
                <input
                  type="number"
                  value={bottleCount}
                  onChange={(e) => setBottleCount(e.target.value)}
                  placeholder="e.g., 50"
                  min="0"
                  step="1"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Selling Price per Bottle (GHS)</label>
                <input
                  type="number"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  placeholder="e.g., 10"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>
            </div>

            {/* Total Revenue */}
            <div className="mt-6 bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-lg border-2 border-blue-300">
              <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-blue-900">₵ {totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Right Column - Results & Summary */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profit Summary Card */}
          <div className={`rounded-2xl shadow-lg p-6 border-t-4 ${isPositiveProfit ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-500' : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-500'}`}>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-2xl">{isPositiveProfit ? '✨' : '⚠️'}</span>
              <span className={isPositiveProfit ? 'text-green-900' : 'text-red-900'}>
                {isPositiveProfit ? 'Profit' : 'Loss'}
              </span>
            </h2>

            <div className="space-y-4">
              {/* Production Cost */}
              <div className="bg-white/70 rounded-lg p-4 backdrop-blur">
                <p className="text-gray-600 text-sm mb-1">Total Production Cost</p>
                <p className="text-2xl font-bold text-gray-800">₵ {totalProductionCost.toFixed(2)}</p>
              </div>

              {/* Revenue */}
              <div className="bg-white/70 rounded-lg p-4 backdrop-blur">
                <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-800">₵ {totalRevenue.toFixed(2)}</p>
              </div>

              {/* Total Profit GHS */}
              <div className={`rounded-lg p-4 ${isPositiveProfit ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className="text-gray-700 text-sm mb-1 font-semibold">Total Profit (GHS)</p>
                <p className={`text-3xl font-bold ${isPositiveProfit ? 'text-green-700' : 'text-red-700'}`}>
                  ₵ {totalProfit.toFixed(2)}
                </p>
              </div>

              {/* Profit Margin */}
              <div className="bg-white/70 rounded-lg p-4 backdrop-blur">
                <p className="text-gray-600 text-sm mb-1">Profit Margin</p>
                <p className={`text-2xl font-bold ${isPositiveProfit ? 'text-green-700' : 'text-red-700'}`}>
                  {profitMargin.toFixed(2)}%
                </p>
              </div>

              {/* Profit in USD */}
              <div className={`rounded-lg p-4 ${isPositiveProfit ? 'bg-blue-100' : 'bg-orange-100'}`}>
                <p className="text-gray-700 text-sm mb-1 font-semibold">Profit (USD)</p>
                <p className={`text-2xl font-bold ${isPositiveProfit ? 'text-blue-700' : 'text-orange-700'}`}>
                  $ {profitInUSD.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Currency Conversion */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-purple-500">
            <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
              <span className="text-xl">💱</span> Exchange Rate
            </h3>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">1 USD = X GHS</label>
              <input
                type="number"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(e.target.value)}
                min="0.01"
                step="0.01"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
              />
              <p className="text-xs text-gray-500 mt-2">Default is 15 GHS per USD</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleSaveCalculation}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="text-xl">💾</span> Save Calculation
            </button>
            <button
              onClick={handleReset}
              className="w-full bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="text-xl">↻</span> Reset Calculator
            </button>
          </div>
        </div>
      </div>

      {/* Summary Box */}
      {bottleCount && sellingPrice && items.length > 0 && (
        <div className="max-w-6xl mx-auto mt-8">
          <div className={`rounded-2xl shadow-lg p-6 border-2 ${isPositiveProfit ? 'border-green-400 bg-gradient-to-r from-green-50 to-emerald-50' : 'border-red-400 bg-gradient-to-r from-red-50 to-rose-50'}`}>
            <p className={`text-lg md:text-xl font-semibold ${isPositiveProfit ? 'text-green-900' : 'text-red-900'}`}>
              💼 Business Summary
            </p>
            <p className="text-gray-700 mt-3 text-base md:text-lg leading-relaxed">
              If you sell <span className="font-bold">{bottleCount}</span> bottles at <span className="font-bold">₵{parseFloat(sellingPrice).toFixed(2)}</span> each, your estimated profit is <span className={`font-bold text-lg ${isPositiveProfit ? 'text-green-700' : 'text-red-700'}`}>₵{totalProfit.toFixed(2)} (${profitInUSD.toFixed(2)})</span> with a profit margin of <span className="font-bold">{profitMargin.toFixed(2)}%</span>.
            </p>
          </div>
        </div>
      )}

      {/* History Panel */}
      {showHistory && (
        <div className="max-w-6xl mx-auto mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-indigo-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-indigo-900 flex items-center gap-2">
                <span className="text-2xl">📋</span> Calculation History
              </h2>
              <button
                onClick={() => setShowHistory(false)}
                className="text-gray-400 hover:text-gray-600 text-3xl font-bold w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition"
              >
                ×
              </button>
            </div>

            {history.length === 0 ? (
              <p className="text-gray-500 text-center py-8 italic">No saved calculations yet. Save your calculations to see them here!</p>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleClearAllHistory}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition transform hover:scale-105 active:scale-95"
                  >
                    Clear All History
                  </button>
                </div>
                {history.map((calc) => (
                  <div
                    key={calc.id}
                    className="border-2 border-indigo-200 rounded-xl p-4 hover:shadow-md transition bg-gradient-to-r from-indigo-50 to-purple-50"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">Date & Time</p>
                        <p className="text-sm font-bold text-gray-800">{calc.date}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">Production Items</p>
                        <p className="text-sm font-bold text-gray-800">{calc.items.length} items</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">Bottles × Price</p>
                        <p className="text-sm font-bold text-gray-800">{calc.bottleCount} × ₵{calc.sellingPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">Total Profit</p>
                        <p className={`text-sm font-bold ${calc.totalProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                          ₵{calc.totalProfit.toFixed(2)} (${calc.profitInUSD.toFixed(2)})
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">Production Cost</p>
                        <p className="text-sm font-bold text-gray-800">₵{calc.totalProductionCost.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">Profit Margin</p>
                        <p className={`text-sm font-bold ${calc.profitMargin >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                          {calc.profitMargin.toFixed(2)}%
                        </p>
                      </div>
                    </div>

                    {/* Production Items Details */}
                    <div className="bg-white rounded-lg p-3 mb-4">
                      <p className="text-xs font-semibold text-gray-600 mb-2 uppercase">Production Items:</p>
                      <div className="space-y-1">
                        {calc.items.map((item) => (
                          <p key={item.id} className="text-sm text-gray-700">
                            • {item.name}: <span className="font-semibold">₵{item.cost.toFixed(2)}</span>
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleLoadCalculation(calc)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition transform hover:scale-105 active:scale-95"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => handleDeleteHistory(calc.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition transform hover:scale-105 active:scale-95"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-12 text-center text-gray-600 text-sm">
        <p>🥛 Yoghurt Business Profit Calculator • Made for Small Business Owners</p>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm transform transition-all animate-fade-in">
            {/* Close Button */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Add Production Item</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 text-3xl font-bold w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <div className="space-y-5">
              {/* Item Name Input */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Item Name</label>
                <input
                  ref={itemNameInputRef}
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., Milk, Sugar, Bottles..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition text-base"
                />
              </div>

              {/* Cost Input */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Cost (GHS)</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-600 font-semibold">₵</span>
                  <input
                    type="number"
                    value={itemCost}
                    onChange={(e) => setItemCost(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition text-base"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition transform hover:scale-105 active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddItem}
                  className="px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl transition transform hover:scale-105 active:scale-95"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Calculator;