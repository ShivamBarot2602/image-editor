export const REMOVE_ANNOTATIONS = 'REMOVE_ANNOTATIONS';

const removeAnnotations = (state, payload) => {
  const { annotations } = state;
  const updatedState = {};
  Object.assign(updatedState, annotations);
  let newSelectionsIds = state.selectionsIds;

  payload.annotationsIds.forEach((id) => {
    newSelectionsIds = newSelectionsIds.filter(
      (selectionId) => selectionId !== id,
    );

    if (state.designLayer && updatedState[id]) {
      const annotationNode = state.designLayer.findOne(`#${id}`);
      if (annotationNode) {
        annotationNode.destroy();
      }
      delete updatedState[id];
    }
  });

  return {
    ...state,
    // not stored in state, used in reducer to consider in undo/redo stacks
    isDesignState: payload.isDesignState || true,
    annotations: updatedState,
    selectionsIds: [],
  };
};

export default removeAnnotations;
