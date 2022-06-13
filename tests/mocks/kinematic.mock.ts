import { Kinematic } from '../../src/kinematic.class';
const Mock = jest.mock('../../src/kinematic.class');
Mock.clearAllMocks();
const renderMock = jest.fn();
const KinematicMock = jest.fn().mockImplementation(() => {
  return {
    render: renderMock,
    edgeColision: () => {},
    hasColision: (el: Kinematic) => {
      el.vector;
    },
    move: () => {},
    gravityChecker() {},
    isDestroy() {},
    destroy() {},
    get vector() {
      return null;
    },
    get gravity() {
      return 6;
    },
    set gravity(value) {
      value;
    },
    get enabledGravity() {
      return true;
    },
    get path() {
      return null;
    },
    get enabledVectorRotation() {
      return true;
    },
  };
});
export default KinematicMock;
