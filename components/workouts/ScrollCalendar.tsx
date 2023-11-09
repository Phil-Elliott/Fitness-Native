import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import {
  addWeeks,
  subWeeks,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  format,
} from "date-fns";

type ScrollCalendarProps = {
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
};

const ScrollCalendar = ({
  selectedDay,
  setSelectedDay,
}: ScrollCalendarProps) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date())
  );
  const [currentWeekEnd, setCurrentWeekEnd] = useState(endOfWeek(new Date()));
  const [days, setDays] = useState<Date[]>();

  // Effect hook to update the days state whenever the start or end of the week changes
  useEffect(() => {
    // Guards to ensure we have valid start and end dates
    if (!currentWeekStart || !currentWeekEnd) return;
    if (currentWeekStart > currentWeekEnd) return;

    // Sets the days state to an array of days within the current week interval
    setDays(
      eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd })
    );
  }, [currentWeekStart, currentWeekEnd]);

  // Gesture handler for swiping through weeks
  const panGesture = Gesture.Pan().onEnd((e) => {
    if (e.translationX < 0) {
      // swipe left to go to the next week
      const newStart = addWeeks(currentWeekStart, 1);
      setCurrentWeekStart(newStart);
      setCurrentWeekEnd(endOfWeek(newStart));
    } else {
      // swipe right to go to the previous week
      const newStart = subWeeks(currentWeekStart, 1);
      setCurrentWeekStart(newStart);
      setCurrentWeekEnd(endOfWeek(newStart));
    }
  });

  return (
    <GestureDetector gesture={panGesture}>
      <View className="py-4 flex-row justify-between">
        {days?.map((day) => {
          // Determine if the current day in the map iteration is the selected day
          const isSelected =
            format(day, "yyyy-MM-dd") === format(selectedDay, "yyyy-MM-dd");

          return (
            <TouchableOpacity
              className={`w-10 h-10 ${
                isSelected ? "bg-gray-700" : "bg-gray-300"
              } rounded-full justify-center items-center`}
              key={day.getDate()}
              onPress={() => setSelectedDay(day)}
            >
              <Text className="text-lg font-bold">{day.getDate()}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </GestureDetector>
  );
};

export default ScrollCalendar;
