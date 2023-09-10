import React, { useEffect, useState } from "react";
import Calendar from "../Utils/Calendar";
import {
  Get5DaysBefore,
  getMinimumDateLogged,
} from "../../utilities/server_utils";

function AdminDashboard({ className }) {
  const [data, setData] = useState(null);
  const [Loading, setIsLoading] = useState(false);
  const [datePicked, setDatePicked] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [minimumDate, setMinimumDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    LoadData();
    // update in 60 seconds
    const refreshData = setInterval(() => {
      LoadData();
    }, 30_000);

    return () => clearInterval(refreshData);
  }, [datePicked]);

  async function LoadData() {
    setIsLoading(true);
    const api_data = await Get5DaysBefore(new Date(datePicked));
    setData(api_data);
    setIsLoading(false);

    const minDate = await getMinimumDateLogged();
    setMinimumDate(minDate.toISOString().split("T")[0]);
  }

  function handleDatePicker({ target }) {
    setDatePicked(new Date(target.value).toISOString().split("T")[0]);
  }
  return (
    <div className={`adminCard ${className}`}>
      <div className="card">
        <h1>Office Logs</h1>
        <div className="flex">
          <label htmlFor="datePicker">Select date: </label>
          <input
            id="datePicker"
            className="date-picker"
            type="date"
            value={datePicked}
            onInput={handleDatePicker}
            max={new Date().toISOString().split("T")[0]}
            min={minimumDate}
          />
        </div>
        {!Loading ? (
          <Calendar calendarData={data} />
        ) : (
          <div className="dashboard-loader">
            <div class="three-body">
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
