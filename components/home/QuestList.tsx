import { useGetQuests } from '@/api/queries/useGetQuests';
import { View, StyleSheet } from 'react-native';
import { colors } from '@/utils/colors';
import QuestCard from './QuestCard';

//TODO : Update state props to QuestCard when we have the data
const QuestList = () => {
    const { data: quests } = useGetQuests();

    return (
        <View style={styles.container}>

            {quests?.map((quest) => <QuestCard quest={quest} key={quest.id} state={'notStarted'} />)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.background,
        flex: 1,
        gap: 10,
        padding: 10,
    },

});
export default QuestList;