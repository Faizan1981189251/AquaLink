import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, Calendar, BarChart3, PieChart } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function SupplierAnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const periods = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' },
  ];

  const monthlyData = {
    totalEarnings: 45600,
    totalOrders: 342,
    avgOrderValue: 133,
    newCustomers: 28,
    earningsGrowth: 12.5,
    ordersGrowth: 8.3,
    customerGrowth: 15.2,
  };

  const dailyEarnings = [
    { day: 'Mon', amount: 1200 },
    { day: 'Tue', amount: 1800 },
    { day: 'Wed', amount: 1500 },
    { day: 'Thu', amount: 2200 },
    { day: 'Fri', amount: 1900 },
    { day: 'Sat', amount: 2800 },
    { day: 'Sun', amount: 2100 },
  ];

  const productBreakdown = [
    { name: '20L Jars', percentage: 65, amount: 29640, color: '#2563EB' },
    { name: '1L Bottles', percentage: 25, amount: 11400, color: '#059669' },
    { name: '500ml Bottles', percentage: 10, amount: 4560, color: '#F59E0B' },
  ];

  const usageBreakdown = [
    { name: 'Home', percentage: 70, orders: 239, color: '#059669' },
    { name: 'Office', percentage: 20, orders: 68, color: '#2563EB' },
    { name: 'Party/Events', percentage: 10, orders: 35, color: '#7C3AED' },
  ];

  const maxEarning = Math.max(...dailyEarnings.map(d => d.amount));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analytics & Reports</Text>
        
        {/* Period Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.periodContainer}
          contentContainerStyle={styles.periodContent}
        >
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodButton,
                selectedPeriod === period.id && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text style={[
                styles.periodText,
                selectedPeriod === period.id && styles.periodTextActive
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Key Metrics */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <DollarSign size={20} color="#059669" />
            <View style={[styles.trendBadge, { backgroundColor: '#D1FAE5' }]}>
              <TrendingUp size={12} color="#059669" />
              <Text style={[styles.trendText, { color: '#059669' }]}>
                +{monthlyData.earningsGrowth}%
              </Text>
            </View>
          </View>
          <Text style={styles.metricValue}>₹{monthlyData.totalEarnings.toLocaleString()}</Text>
          <Text style={styles.metricLabel}>Total Earnings</Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Package size={20} color="#2563EB" />
            <View style={[styles.trendBadge, { backgroundColor: '#DBEAFE' }]}>
              <TrendingUp size={12} color="#2563EB" />
              <Text style={[styles.trendText, { color: '#2563EB' }]}>
                +{monthlyData.ordersGrowth}%
              </Text>
            </View>
          </View>
          <Text style={styles.metricValue}>{monthlyData.totalOrders}</Text>
          <Text style={styles.metricLabel}>Total Orders</Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <BarChart3 size={20} color="#7C3AED" />
            <View style={[styles.trendBadge, { backgroundColor: '#EDE9FE' }]}>
              <TrendingUp size={12} color="#7C3AED" />
              <Text style={[styles.trendText, { color: '#7C3AED' }]}>
                +5.2%
              </Text>
            </View>
          </View>
          <Text style={styles.metricValue}>₹{monthlyData.avgOrderValue}</Text>
          <Text style={styles.metricLabel}>Avg Order Value</Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Users size={20} color="#DC2626" />
            <View style={[styles.trendBadge, { backgroundColor: '#FEE2E2' }]}>
              <TrendingUp size={12} color="#DC2626" />
              <Text style={[styles.trendText, { color: '#DC2626' }]}>
                +{monthlyData.customerGrowth}%
              </Text>
            </View>
          </View>
          <Text style={styles.metricValue}>{monthlyData.newCustomers}</Text>
          <Text style={styles.metricLabel}>New Customers</Text>
        </View>
      </View>

      {/* Daily Earnings Chart */}
      <View style={styles.chartSection}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Daily Earnings</Text>
          <TouchableOpacity style={styles.chartAction}>
            <Calendar size={16} color="#2563EB" />
            <Text style={styles.chartActionText}>View Details</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.chartContainer}>
          <View style={styles.chart}>
            {dailyEarnings.map((item, index) => (
              <View key={index} style={styles.chartBar}>
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: (item.amount / maxEarning) * 120,
                      backgroundColor: item.amount === maxEarning ? '#2563EB' : '#E2E8F0'
                    }
                  ]} 
                />
                <Text style={styles.barLabel}>{item.day}</Text>
                <Text style={styles.barValue}>₹{item.amount}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Product Breakdown */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Product Performance</Text>
          <TouchableOpacity>
            <PieChart size={20} color="#2563EB" />
          </TouchableOpacity>
        </View>
        
        {productBreakdown.map((product, index) => (
          <View key={index} style={styles.productItem}>
            <View style={styles.productInfo}>
              <View style={[styles.productColor, { backgroundColor: product.color }]} />
              <Text style={styles.productName}>{product.name}</Text>
            </View>
            <View style={styles.productStats}>
              <Text style={styles.productPercentage}>{product.percentage}%</Text>
              <Text style={styles.productAmount}>₹{product.amount.toLocaleString()}</Text>
            </View>
            <View style={styles.productBar}>
              <View 
                style={[
                  styles.productProgress, 
                  { 
                    width: `${product.percentage}%`,
                    backgroundColor: product.color 
                  }
                ]} 
              />
            </View>
          </View>
        ))}
      </View>

      {/* Usage Analysis */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Usage Analysis</Text>
        
        {usageBreakdown.map((usage, index) => (
          <View key={index} style={styles.usageItem}>
            <View style={styles.usageInfo}>
              <View style={[styles.usageColor, { backgroundColor: usage.color }]} />
              <View style={styles.usageDetails}>
                <Text style={styles.usageName}>{usage.name}</Text>
                <Text style={styles.usageOrders}>{usage.orders} orders</Text>
              </View>
            </View>
            <View style={styles.usageStats}>
              <Text style={styles.usagePercentage}>{usage.percentage}%</Text>
            </View>
            <View style={styles.usageBar}>
              <View 
                style={[
                  styles.usageProgress, 
                  { 
                    width: `${usage.percentage}%`,
                    backgroundColor: usage.color 
                  }
                ]} 
              />
            </View>
          </View>
        ))}
      </View>

      {/* Monthly Summary */}
      <View style={styles.summarySection}>
        <Text style={styles.summaryTitle}>Monthly Summary</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Best Day</Text>
            <Text style={styles.summaryValue}>Saturday</Text>
            <Text style={styles.summarySubtext}>₹2,800 earned</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Top Product</Text>
            <Text style={styles.summaryValue}>20L Jars</Text>
            <Text style={styles.summarySubtext}>65% of sales</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Growth Rate</Text>
            <Text style={styles.summaryValue}>+12.5%</Text>
            <Text style={styles.summarySubtext}>vs last month</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Customer Retention</Text>
            <Text style={styles.summaryValue}>78%</Text>
            <Text style={styles.summarySubtext}>repeat customers</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  periodContainer: {
    marginTop: 8,
  },
  periodContent: {
    gap: 8,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  periodButtonActive: {
    backgroundColor: '#2563EB',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  periodTextActive: {
    color: '#FFFFFF',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    marginTop: 20,
    gap: 12,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 2,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  chartSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  chartAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartActionText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
    marginLeft: 4,
  },
  chartContainer: {
    height: 180,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
    paddingHorizontal: 8,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 10,
    color: '#64748B',
    marginBottom: 2,
  },
  barValue: {
    fontSize: 9,
    color: '#94A3B8',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  productItem: {
    marginBottom: 16,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  productColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
    flex: 1,
  },
  productStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  productAmount: {
    fontSize: 12,
    color: '#64748B',
  },
  productBar: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
  },
  productProgress: {
    height: 6,
    borderRadius: 3,
  },
  usageItem: {
    marginBottom: 16,
  },
  usageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  usageColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  usageDetails: {
    flex: 1,
  },
  usageName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
  },
  usageOrders: {
    fontSize: 12,
    color: '#64748B',
  },
  usageStats: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  usagePercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  usageBar: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
  },
  usageProgress: {
    height: 6,
    borderRadius: 3,
  },
  summarySection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryItem: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  summarySubtext: {
    fontSize: 10,
    color: '#94A3B8',
  },
});