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
    <View>
      <View className="pt-4 flex-row justify-between">
        <Text className="text-base font-bold">
          {format(currentWeekStart, "MMMM yyyy")}
        </Text>
      </View>
      <GestureDetector gesture={panGesture}>
        <View className="pb-4 pt-2 flex-row justify-between">
          {days?.map((day) => {
            // Determine if the current day in the map iteration is the selected day
            const isSelected =
              format(day, "yyyy-MM-dd") === format(selectedDay, "yyyy-MM-dd");

            // Format the day of the week to be displayed
            const dayOfWeek = format(day, "EEE");

            return (
              <View className="flex items-center gap-2" key={day.toISOString()}>
                <TouchableOpacity
                  className={`w-10 h-10 ${
                    isSelected ? "bg-gray-700" : ""
                  } rounded-full justify-center items-center`}
                  key={day.getDate()}
                  onPress={() => setSelectedDay(day)}
                  activeOpacity={0.6}
                >
                  <Text className="font-bold text-base">{day.getDate()}</Text>
                </TouchableOpacity>
                <Text className="">{dayOfWeek}</Text>
              </View>
            );
          })}
        </View>
      </GestureDetector>
    </View>
  );
};

export default ScrollCalendar;
