const DataMonitor = ({ data }) => {
  return (
    <div className="mt-4 shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Data Monitor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-xl p-4 flex items-center gap-4"
            style={{ borderLeft: `6px solid ${item.color}` }}
          >
            <div className="text-3xl">{item.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DataMonitor;
