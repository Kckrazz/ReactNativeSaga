import _ from "lodash";
import moment from "moment";
import { createSelector } from "reselect";

export const groupedById = s => s.shifts;
export const groupedByDate = (s, id, date) => {
  return s.shifts.get(date).filter(sh => {
    return sh.get("id") === id;
  });
};
export const getByDateId = createSelector(groupedByDate, _shifts => {
  return _shifts.first();
});

export const groupedByDateThenId = createSelector(groupedById, shifts =>
  _(shifts).reduce((map, shift) => {
    const shiftDate = moment(shift.start).startOf("day").format("YYYY-MM-DD");
    const newMap = map;
    if (shiftDate in newMap) {
      newMap[shiftDate][shift.id] = shift;
    } else {
      newMap[shiftDate] = { [shift.id]: shift };
    }
    return newMap;
  }, {})
);

export const loaded = createSelector(
  groupedById,
  _shifts => _.size(_shifts) > 0
);

export const loadError = s => s.meta.shifts.loadError;
//   const error = s.meta.shifts.loadError;
//   return _.isEmpty(error) ? null : `error loading shifts: ${error}`;
// };
