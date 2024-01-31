import React from "react";
import { styled } from "@linaria/react";
import FormTodo from "../FormTodo/FormTodo";
import TodosList from "../TodosList/TodosList";
import Control from "../Control/Control";
import { TodoItemProps } from "../../store/todos";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

export type TodosArray = TodoItemProps[] | [];

const StyledMain = styled.main`
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
  flex: 1 1 auto;
`;

const StyledMainTodos = styled.section`
  margin: 0 auto;
  position: relative;
  width: min(800px, 92vw);
  border-radius: 10px 10px 0 0;
  z-index: 3;
  overflow: hidden;
`;

const StyledSpanBlockOne = styled.span`
  margin: 0 auto;
  display: block;
  position: relative;
  width: min(780px, 88vw);
  height: 8px;
  z-index: 2;
`;
const StyledSpanBlockTwo = styled.span`
  margin: 0 auto 20px;
  display: block;
  position: relative;
  width: min(760px, 84vw);
  height: 8px;
  z-index: 1;
`;

const Main = observer(() => {
  const { todosStore, globalUIStore } = useStore();
  /* const [todosToDisplay, setTodosToDisplay] = useState<TodosArray>([]);

  useEffect(() => {
    setTodosToDisplay(todosStore.todosList);
  }, [setTodosToDisplay, todosStore.todosList]);

  const handleFilter = (value: string) => {
    if (value === "all") {
      setTodosToDisplay(todosStore.todosList);
    } else if (value === "active") {
      setTodosToDisplay(todosStore.getActiveTodos());
    } else {
      setTodosToDisplay(todosStore.getCompletedTodos());
    }
  }; */

  const mainStyle = {
    backgroundColor: globalUIStore.theme.mainBodyColor,
    boxShadow: `0px 2px 4px ${globalUIStore.theme.boxShadowColor}`,
  };

  return (
    <StyledMain
      style={{ backgroundColor: globalUIStore.theme.backgroundColor }}
    >
      <StyledMainTodos style={mainStyle}>
        <FormTodo />
        <TodosList list={todosStore.getActualTodos()} />
        <Control />
      </StyledMainTodos>
      <StyledSpanBlockOne style={mainStyle} />
      <StyledSpanBlockTwo style={mainStyle} />
    </StyledMain>
  );
});

export default Main;
