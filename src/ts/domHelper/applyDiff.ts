const differentValue = (node1: HTMLInputElement, node2: HTMLInputElement) => {
  if (node1.value !== node2.value) {
    return true;
  }

  if (node1.checked !== node2.checked) {
    return true;
  }

  return false;
};

const isNodeChanged = (node1: Element, node2: Element) => {
  const n1Attributes = node1.attributes;
  const n2Attributes = node2.attributes;
  // 노드의 어트리뷰트 갯수가 다르다면 변화된것
  if (n1Attributes.length !== n2Attributes.length) {
    return true;
  }

  const differentAttribute = Array.from(n1Attributes).find(attribute => {
    const { name } = attribute;
    const attribute1 = node1.getAttribute(name);
    const attribute2 = node2.getAttribute(name);

    return attribute1 !== attribute2;
  });

  // 어트리뷰트의 값이 다른게 하나라도 있다면 변화된것
  if (differentAttribute) {
    return true;
  }

  // 만약 value프로퍼티의 값이 바뀌었다면 변화된것
  if (differentValue(node1 as HTMLInputElement, node2 as HTMLInputElement)) {
    return true;
  }

  // 하위노드의 갯수가 다르거나 텍스트노드의 값이 다를 경우 변화환것
  if (
    node1.children.length === 0 &&
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent
  ) {
    return true;
  }

  // 위의 경우가 다 틀리다면 변화하지 않은것으로 판단하고 리렌더링을 하지 않는다.
  return false;
};

const applyDiff = (parentNode: Element, realNode: Element, virtualNode: Element) => {
  // 실제 돔에는 있지만 상태 변화가 적용된 가상돔에 node가 존재하지 않는다면 실제돔에서 삭제처리
  if (realNode && !virtualNode) {
    realNode.remove();
    return;
  }

  // 실제 돔에는 없지만 상태 변화가 적용된 가상돔에는 node가 존재한다면 생성
  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return;
  }

  if (isNodeChanged(virtualNode, realNode)) {
    realNode.replaceWith(virtualNode);
    return;
  }

  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);

  const max = Math.max(realChildren.length, virtualChildren.length);
  // 재귀적으로 가장 깊은 node까지 탐색한다
  for (let i = 0; i < max; i++) {
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  }
};

export default applyDiff;
