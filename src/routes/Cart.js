import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { increase } from "./../store/userSlice";
import { addCount, removeItem } from "./../store";

function Cart() {
  let state = useSelector((state) => {
    return state;
  });
  let prchs = useSelector((state) => state.prchs);

  let dispatch = useDispatch();
  return (
    <div>
      {state.user.name}님의 나이{state.user.age}의 장바구니
      <button
        onClick={() => {
          dispatch(increase());
        }}
      >
        버튼
      </button>
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
              <td>{prchs[i].id}</td>
              <td>{prchs[i].name}</td>
              <td>{prchs[i].count}</td>
              <td>
                <button onClick={() => dispatch(addCount(prchs[i].id))}>
                  +
                </button>
                <button
                  style={{ backgroundColor: "pink" }}
                  onClick={() => dispatch(removeItem(prchs[i].id))}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
