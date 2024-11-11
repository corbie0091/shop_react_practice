import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../store";

function Cart() {
  let a = useSelector((state) => {
    return state;
  });
  let state = useSelector((state) => {
    return state;
  });
  let prchs = useSelector((state) => state.prchs);
  console.log(prchs);

  let dispatch = useDispatch();
  return (
    <div>
      {state.user}의 장바구니
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.prchs.map((a, i) => (
            <tr key={i}>
              <td>{prchs[i].id + 1}</td>
              <td>{prchs[i].name}</td>
              <td>{prchs[i].count}</td>
              <td>
                <button onClick={() => dispatch(changeName())}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
