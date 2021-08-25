import ButtonWrapper from "./Button";
import Status from "../constants/Status";
import {inject, observer} from "mobx-react";
import {useMemo} from "react";

const Heading = observer((props: any) => {
	const { list } = props;
	const counterColorFactory = () => {
		if (list.finishedTodos === 0 || list.finishedTodos <= list.totalTodos / 2) return { color: "red" }
		if (list.finishedTodos >= list.totalTodos / 2 && list.finishedTodos !== list.totalTodos) return { color: "#fbbd08" }
		if (list.finishedTodos === list.totalTodos) return { color: "green" }
	}
	const counterStatusColor = useMemo(counterColorFactory, [list.finishedTodos, list.totalTodos])

	return (
		<div className="headingWrapper">
			<div className="headingButtons">
				<ButtonWrapper size="tiny" color="grey" text="All" icon="hotjar" onClick={() => list.setFilterKey('')} />
				<ButtonWrapper size="tiny" color="yellow" text="Todo" icon="circle outline" onClick={() => list.setFilterKey(Status.TODO)} />
				<ButtonWrapper size="tiny" color="green" text="Finished" icon="circle" onClick={() => list.setFilterKey(Status.COMPLETED)} />
			</div>
			<div className="headingParagraph">
				<p style={counterStatusColor}>Todos done: { list.finishedTodos } / <strong>{ list.totalTodos }</strong></p>
			</div>
		</div>
	)
})

export default inject('list')(Heading);
