import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Shield, Award, Beaker, TrendingUp, CheckCircle, AlertTriangle, Info } from 'lucide-react-native';
import { LabReportAnalyzer, LabReport } from '@/lib/ai-recommendations';

interface SupplierQualityCardProps {
  supplier: {
    id: string;
    name: string;
    qualityScore: number;
    certifications: string[];
    labReports: LabReport[];
    deliverySpeedScore: number;
    reliabilityScore: number;
    customerSatisfaction: number;
  };
  onViewDetails?: () => void;
}

export default function SupplierQualityCard({ supplier, onViewDetails }: SupplierQualityCardProps) {
  const latestLabReport = supplier.labReports[0];
  const qualityInsights = latestLabReport ? LabReportAnalyzer.generateQualityInsights(latestLabReport) : [];

  const getScoreColor = (score: number) => {
    if (score >= 8) return '#059669';
    if (score >= 6) return '#F59E0B';
    return '#DC2626';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 9) return 'Excellent';
    if (score >= 8) return 'Very Good';
    if (score >= 7) return 'Good';
    if (score >= 6) return 'Fair';
    return 'Poor';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.qualityBadge}>
            <Shield size={20} color="#FFFFFF" />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.supplierName}>{supplier.name}</Text>
            <Text style={styles.qualityLabel}>Quality Certified</Text>
          </View>
        </View>
        <View style={styles.overallScore}>
          <Text style={[styles.scoreNumber, { color: getScoreColor(supplier.qualityScore) }]}>
            {supplier.qualityScore.toFixed(1)}
          </Text>
          <Text style={styles.scoreLabel}>{getScoreLabel(supplier.qualityScore)}</Text>
        </View>
      </View>

      {/* Quality Metrics */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricItem}>
          <Beaker size={16} color="#2563EB" />
          <Text style={styles.metricLabel}>Water Quality</Text>
          <View style={styles.metricBar}>
            <View 
              style={[
                styles.metricProgress, 
                { 
                  width: `${supplier.qualityScore * 10}%`,
                  backgroundColor: getScoreColor(supplier.qualityScore)
                }
              ]} 
            />
          </View>
          <Text style={styles.metricValue}>{supplier.qualityScore.toFixed(1)}/10</Text>
        </View>

        <View style={styles.metricItem}>
          <TrendingUp size={16} color="#059669" />
          <Text style={styles.metricLabel}>Delivery Speed</Text>
          <View style={styles.metricBar}>
            <View 
              style={[
                styles.metricProgress, 
                { 
                  width: `${supplier.deliverySpeedScore * 10}%`,
                  backgroundColor: getScoreColor(supplier.deliverySpeedScore)
                }
              ]} 
            />
          </View>
          <Text style={styles.metricValue}>{supplier.deliverySpeedScore.toFixed(1)}/10</Text>
        </View>

        <View style={styles.metricItem}>
          <CheckCircle size={16} color="#7C3AED" />
          <Text style={styles.metricLabel}>Reliability</Text>
          <View style={styles.metricBar}>
            <View 
              style={[
                styles.metricProgress, 
                { 
                  width: `${supplier.reliabilityScore * 10}%`,
                  backgroundColor: getScoreColor(supplier.reliabilityScore)
                }
              ]} 
            />
          </View>
          <Text style={styles.metricValue}>{supplier.reliabilityScore.toFixed(1)}/10</Text>
        </View>
      </View>

      {/* Certifications */}
      <View style={styles.certificationsContainer}>
        <Text style={styles.sectionTitle}>Certifications</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.certificationsList}>
            {supplier.certifications.map((cert, index) => (
              <View key={index} style={styles.certificationBadge}>
                <Award size={14} color="#059669" />
                <Text style={styles.certificationText}>{cert}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Latest Lab Report Insights */}
      {latestLabReport && (
        <View style={styles.labReportContainer}>
          <View style={styles.labReportHeader}>
            <Text style={styles.sectionTitle}>Latest Quality Report</Text>
            <Text style={styles.reportDate}>
              {new Date(latestLabReport.date).toLocaleDateString()}
            </Text>
          </View>
          
          <View style={styles.insightsContainer}>
            {qualityInsights.slice(0, 3).map((insight, index) => (
              <View key={index} style={styles.insightItem}>
                <Text style={styles.insightText}>{insight}</Text>
              </View>
            ))}
          </View>

          <View style={styles.parametersGrid}>
            <View style={styles.parameterItem}>
              <Text style={styles.parameterLabel}>pH Level</Text>
              <Text style={styles.parameterValue}>{latestLabReport.parameters.ph}</Text>
            </View>
            <View style={styles.parameterItem}>
              <Text style={styles.parameterLabel}>TDS (ppm)</Text>
              <Text style={styles.parameterValue}>{latestLabReport.parameters.tds}</Text>
            </View>
            <View style={styles.parameterItem}>
              <Text style={styles.parameterLabel}>Chlorine</Text>
              <Text style={styles.parameterValue}>{latestLabReport.parameters.chlorine}</Text>
            </View>
            <View style={styles.parameterItem}>
              <Text style={styles.parameterLabel}>Bacteria</Text>
              <Text style={[
                styles.parameterValue,
                { color: latestLabReport.parameters.bacteria === 0 ? '#059669' : '#DC2626' }
              ]}>
                {latestLabReport.parameters.bacteria === 0 ? 'None' : latestLabReport.parameters.bacteria}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Customer Satisfaction */}
      <View style={styles.satisfactionContainer}>
        <Text style={styles.sectionTitle}>Customer Satisfaction</Text>
        <View style={styles.satisfactionScore}>
          <Text style={styles.satisfactionNumber}>
            {(supplier.customerSatisfaction * 100).toFixed(0)}%
          </Text>
          <Text style={styles.satisfactionLabel}>Happy Customers</Text>
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity style={styles.viewDetailsButton} onPress={onViewDetails}>
        <Info size={16} color="#2563EB" />
        <Text style={styles.viewDetailsText}>View Full Quality Report</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  qualityBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  supplierName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  qualityLabel: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  overallScore: {
    alignItems: 'center',
  },
  scoreNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 2,
  },
  scoreLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  metricsContainer: {
    marginBottom: 20,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 8,
    width: 80,
  },
  metricBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    marginHorizontal: 12,
  },
  metricProgress: {
    height: 6,
    borderRadius: 3,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
    width: 40,
    textAlign: 'right',
  },
  certificationsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  certificationsList: {
    flexDirection: 'row',
    gap: 8,
  },
  certificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  certificationText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#059669',
    marginLeft: 4,
  },
  labReportContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  labReportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reportDate: {
    fontSize: 12,
    color: '#64748B',
  },
  insightsContainer: {
    marginBottom: 16,
  },
  insightItem: {
    marginBottom: 6,
  },
  insightText: {
    fontSize: 12,
    color: '#1E293B',
    lineHeight: 16,
  },
  parametersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  parameterItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
  },
  parameterLabel: {
    fontSize: 10,
    color: '#64748B',
    marginBottom: 2,
  },
  parameterValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  satisfactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  satisfactionScore: {
    alignItems: 'center',
  },
  satisfactionNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 2,
  },
  satisfactionLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBF4FF',
    paddingVertical: 12,
    borderRadius: 12,
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563EB',
    marginLeft: 6,
  },
});