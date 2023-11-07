// 患者情報のダミーデータ


// 患者情報を表示するコンポーネント
export const PatientBioDataList = ({ patients }) => {
  return (
    <div>
      <h2>Patient Information</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            <h3>ID: {patient.id}</h3>
            <ul>
            <li>Name: {patient.name}</li>
            <li><p>Age: {patient.age}</p></li>
            <li><p>Heart Rate: {patient.heartRate} beats per minute</p></li>
            <li><p>Blood Pressure: {patient.bloodPressure}</p></li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};