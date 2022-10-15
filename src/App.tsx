import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  position: absolute;
  top: 300px;
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  top: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  margin-bottom: 100px;
`;

const boxVariant = {
  invisible: (isBack: boolean) => ({
    x: isBack ? -500 : 500,
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  end: (isBack: boolean) => ({
    x: isBack ? 500 : -500,
    opacity: 0,
    transition: {
      duration: 1,
    },
  }),
};

function App() {
  const [visible, setVisible] = useState(1);
  const [isBack, setIsBack] = useState(false);
  const nextPlease = () => {
    setIsBack(false);
    setVisible(visible === 10 ? 10 : visible + 1);
  };
  const backPlease = () => {
    setIsBack(true);
    setVisible(visible === 1 ? 1 : visible - 1);
  };
  return (
    <Wrapper>
      <AnimatePresence custom={isBack}>
        <Box
          custom={isBack}
          variants={boxVariant}
          initial="invisible"
          animate="visible"
          exit="end"
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={nextPlease}>Next</button>
      <button onClick={backPlease}>Back</button>
    </Wrapper>
  );
}

export default App;
