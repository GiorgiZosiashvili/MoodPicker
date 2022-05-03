import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { MoodOptionsType, MoodOptionWithTimestap } from "../Types";
import AsyncStorage from "@react-native-async-storage/async-storage";
type AppData = {
  moodList: MoodOptionWithTimestap[];
};
const datakey = "my-app-data";
const setAppData = async (appData: AppData): Promise<void> => {
  try {
    await AsyncStorage.setItem(datakey, JSON.stringify(appData));
  } catch {}
};
const getAppData = async (): Promise<AppData> | null => {
  try {
    const result = await AsyncStorage.getItem(datakey);
    if (result) {
      return JSON.parse(result);
    }
  } catch {}
  return null;
};
type AppContextType = {
  moodList: MoodOptionWithTimestap[];
  handleSelectMood: (mood: MoodOptionsType) => void;
  handleDeleteMood: (mood: MoodOptionWithTimestap) => void;
};
const AppContext = createContext<AppContextType>({
  moodList: [],
  handleSelectMood: () => {},
  handleDeleteMood: () => {},
});
export const AppProvider: React.FC = ({ children }) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestap[]>([]);
  const handleSelectMood = useCallback((selectedMood: MoodOptionsType) => {
    setMoodList((current) => {
      const newMoodList = [
        ...current,
        { mood: selectedMood, timestamp: Date.now() },
      ];
      setAppData({ moodList: newMoodList });
      return newMoodList;
    });
  }, []);

  const handleDeleteMood = useCallback((mood: MoodOptionWithTimestap) => {
    setMoodList((current) => {
      const newMoodList = current.filter(
        (val) => val.timestamp !== mood.timestamp
      );
      setAppData({ moodList: newMoodList });
      return newMoodList;
    });
  }, []);

  useEffect(() => {
    const fetchAppData = async () => {
      const data = await getAppData();
      if (data) {
        setMoodList(data.moodList);
      }
    };
    fetchAppData();
  }, []);
  return (
    <AppContext.Provider
      value={{ moodList, handleSelectMood, handleDeleteMood }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);
