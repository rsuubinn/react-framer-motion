import styled from "styled-components";
import { motion, AnimatePresence, motionValue } from "framer-motion";
import React, { useEffect, useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
  position: absolute;
`;

const Box = styled(motion.div)`
  height: 200px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled(motion.button)`
  position: absolute;
  bottom: 100px;
  border: none;
  width: 60px;
  height: 30px;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  color: #0fa1fb;
`;

const Circle = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  hover: (n: number) => ({
    scale: 1.1,
    x: n === 1 || n === 3 ? -25 : n === 2 || n === 4 ? 25 : 0,
    y: n === 1 || n === 2 ? -25 : n === 3 || n === 4 ? 25 : 0,
  }),
};

const btnVariants = {
  doing: (clicked: boolean) => ({
    color: clicked ? "#FF9200" : "#0fa1fb",
    scale: clicked ? 1.2 : 1,
  }),
};

function App() {
  const x = motionValue(0);
  const [id, setId] = useState<null | string>(null);
  const [clicked, setClicked] = useState(false);

  const onBtnClick = () => {
    setClicked((prev) => !prev);
  };
  useEffect(() => {
    x.onChange(() => console.log(x));
  });
  return (
    <Wrapper>
      <Grid>
        {[1, 2, 3, 4].map((n) => (
          <Box
            variants={boxVariants}
            whileHover="hover"
            onClick={() => setId(n + "")}
            key={n}
            custom={n}
            layoutId={n + ""}
          >
            {n === 2 && !clicked ? <Circle layoutId="circle" /> : null}
            {n === 3 && clicked ? <Circle layoutId="circle" /> : null}
          </Box>
        ))}
      </Grid>
      <Button
        custom={clicked}
        onClick={onBtnClick}
        variants={btnVariants}
        animate="doing"
      >
        Switch
      </Button>
      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => setId(null)}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <Box
              layoutId={id + ""}
              style={{
                width: 400,
                height: 200,
                backgroundColor: "rgba(255,255,255, 1)",
              }}
            ></Box>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
