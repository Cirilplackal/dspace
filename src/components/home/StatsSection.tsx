export function StatsSection() {
  const stats = [
    { label: 'Products', value: '10,000+', description: 'Available items' },
    { label: 'Customers', value: '50,000+', description: 'Happy customers' },
    { label: 'Categories', value: '500+', description: 'Product categories' },
    { label: 'Countries', value: '100+', description: 'Worldwide shipping' },
  ];

  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 