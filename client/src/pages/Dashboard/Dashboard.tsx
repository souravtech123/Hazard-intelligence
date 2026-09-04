import DisasterMap from "../../components/map/DisasterMap";
import RiskScoreCard from "../../components/risk/RiskScoreCard";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Disaster risk and relocation overview
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <RiskScoreCard score={68} level="HIGH" />

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Habitations</p>
          <p className="mt-2 text-3xl font-bold">128</p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">High Risk Habitations</p>
          <p className="mt-2 text-3xl font-bold">34</p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Relocation Sites</p>
          <p className="mt-2 text-3xl font-bold">12</p>
        </div>
      </div>

      <DisasterMap />
    </div>
  );
};

export default Dashboard;
