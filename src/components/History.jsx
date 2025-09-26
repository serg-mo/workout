import moment from 'moment';
import React from 'react';
import { formatDate, getLocalStorage } from '../lib';

const getColor = (count) => {
  if (count === 0) return 'bg-gray-100';
  if (count === 1) return 'bg-green-100';
  if (count === 2) return 'bg-green-300';
  if (count === 3) return 'bg-green-500';
  return 'bg-green-700';
};

export default function History() {
  const { history } = getLocalStorage();
  const length = 12; // weeks
  const startDate = moment().subtract(length, 'weeks').endOf('week');

  return (
    <div className="flex justify-center p-2 overflow-auto">
      <table className="table-auto border-collapse">
        <tbody>
          {[...Array(7)].map((_, dayIndex) => (
            <tr key={dayIndex}>
              {[...Array(length)].map((_, weekIndex) => {
                const date = startDate.clone().add(weekIndex, 'weeks').add(dayIndex, 'days');
                const dateStr = formatDate(date);
                const count = history[dateStr] ? Object.keys(history[dateStr]).length : 0;
                const isToday = date.isSame(moment(), 'day');

                return (
                  <td
                    key={dateStr}
                    className={`w-3 h-3 text-center border ${isToday && !count ? 'bg-red-200' : getColor(count)}`}
                    title={`${dateStr}: ${count} exercises`}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
