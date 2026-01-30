import React from 'react';
import { 
  Package, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Bell,
  Eye,
  Star,
  MapPin,
  IndianRupee as Rupee,
  ArrowUp,
  ArrowDown,
  Activity
} from 'lucide-react';
import { Produce, Transaction } from '../../types';

interface TraderDashboardProps {
  availableProduce: Produce[];
  myTransactions: Transaction[];
}

const TraderDashboard: React.FC<TraderDashboardProps> = ({ 
  availableProduce, 
  myTransactions 
}) => {
  const activeBids = myTransactions.filter(t => t.status === 'pending' || t.status === 'deal_accepted').length;
  const completedDeals = myTransactions.filter(t => t.status === 'completed').length;
  const totalProduce = availableProduce.length;
  const pendingPayments = myTransactions.filter(t => t.status === 'payment_initiated').length;

  // Calculate total investment
  const totalInvestment = myTransactions
    .filter(t => t.status !== 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">नमस्ते व्यापारी!</h2>
            <p className="text-blue-100 text-sm">Welcome Trader!</p>
            <p className="text-blue-200 text-xs mt-1">आज के अवसर देखें</p>
          </div>
          <div className="relative">
            <Bell size={24} />
            {(activeBids > 0 || pendingPayments > 0) && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">{activeBids + pendingPayments}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">{totalProduce}</p>
              <p className="text-sm text-gray-600 font-medium">उपलब्ध फसलें</p>
              <p className="text-xs text-gray-500">Available Produce</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-orange-600">{activeBids}</p>
              <p className="text-sm text-gray-600 font-medium">सक्रिय बोलियां</p>
              <p className="text-xs text-gray-500">Active Bids</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <TrendingUp className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Investment Summary */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Rupee size={24} className="text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">निवेश सारांश</h3>
            <p className="text-sm text-gray-600">Investment Summary</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-green-700 mb-1">कुल निवेश / Total Investment</p>
            <p className="text-xl font-bold text-green-800">₹{totalInvestment.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700 mb-1">पूर्ण सौदे / Completed Deals</p>
            <p className="text-xl font-bold text-blue-800">{completedDeals}</p>
          </div>
        </div>
      </div>

      {/* Market Opportunities */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">बाज़ार के अवसर</h3>
              <p className="text-sm text-gray-600">Market Opportunities</p>
            </div>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              सभी देखें
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          {availableProduce.slice(0, 3).map((produce) => (
            <div key={produce.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg border border-gray-100 transition-colors">
              <img 
                src={produce.images[0] || "https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg"} 
                alt={produce.name}
                className="w-14 h-14 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-medium text-gray-800">{produce.name}</p>
                  {produce.bids.length > 0 && (
                    <div className="flex items-center space-x-1 bg-orange-100 px-2 py-1 rounded-full">
                      <Star size={12} className="text-orange-600" />
                      <span className="text-xs text-orange-700 font-medium">
                        {produce.bids.length} bids
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <MapPin size={12} className="mr-1" />
                  <span>{produce.location}</span>
                </div>
                <p className="text-xs text-gray-500">{produce.quantity} {produce.unit} उपलब्ध</p>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-green-600">₹{produce.currentPrice.toLocaleString()}</p>
                <p className="text-xs text-gray-500">per {produce.unit}</p>
                <button className="mt-1 p-1 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">
                  <Eye size={14} className="text-blue-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Transactions */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Activity size={20} className="text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">सक्रिय लेन-देन</h3>
              <p className="text-sm text-gray-600">Active Transactions</p>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          {myTransactions.length === 0 ? (
            <div className="text-center py-8">
              <Clock size={48} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500 font-medium">कोई लेन-देन नहीं</p>
              <p className="text-sm text-gray-400">No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myTransactions.slice(0, 3).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.status === 'completed' ? 'bg-green-100' :
                      transaction.status === 'payment_initiated' ? 'bg-blue-100' :
                      'bg-orange-100'
                    }`}>
                      {transaction.status === 'completed' ? (
                        <CheckCircle size={20} className="text-green-600" />
                      ) : (
                        <Clock size={20} className={
                          transaction.status === 'payment_initiated' ? 'text-blue-600' : 'text-orange-600'
                        } />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Transaction #{transaction.id.slice(0, 8)}</p>
                      <p className="text-sm text-gray-600">₹{transaction.amount.toLocaleString()} - {transaction.quantity} क्विंटल</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'payment_initiated' ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {transaction.status === 'completed' ? 'पूर्ण' :
                       transaction.status === 'payment_initiated' ? 'भुगतान में' :
                       transaction.status === 'deal_accepted' ? 'स्वीकृत' : 'लंबित'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Payment Alerts */}
      {pendingPayments > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock size={20} className="text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-yellow-800">भुगतान लंबित</p>
              <p className="text-sm text-yellow-700">
                {pendingPayments} payments are being processed / {pendingPayments} भुगतान प्रक्रिया में
              </p>
            </div>
            <button className="text-yellow-700 font-medium text-sm hover:text-yellow-800">
              ट्रैक करें
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TraderDashboard;