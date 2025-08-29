// src/components/AvatarSOL/partsLoader.ts

// Parts for character 1
import Head1 from './parts01/head.svg?react';
import Eye1 from './parts01/eye.svg?react';
import Mouth1 from './parts01/mouth.svg?react';
import Body1 from './parts01/body.svg?react';
import LArm1 from './parts01/l_arm.svg?react';
import RArm1 from './parts01/r_arm.svg?react';
import LLeg1 from './parts01/l_leg.svg?react';
import RLeg1 from './parts01/r_leg.svg?react';
import Chick1 from './parts01/chick.svg?react';

// Parts for character 2
// Assuming parts02 has the same structure. If not, adjust accordingly.
import Head2 from './parts02/head.svg?react';
import Eye2 from './parts02/eye.svg?react';
import Mouth2 from './parts02/mouth.svg?react';
import Body2 from './parts02/body.svg?react';
import LArm2 from './parts02/l_arm.svg?react';
import RArm2 from './parts02/r_arm.svg?react';
import LLeg2 from './parts02/l_leg.svg?react';
import RLeg2 from './parts02/r_leg.svg?react';
import Chick2 from './parts02/chick.svg?react';

// Parts for character 3
// Assuming parts03 has the same structure. If not, adjust accordingly.
import Head3 from './parts03/head.svg?react';
import Eye3 from './parts03/eye.svg?react';
import Mouth3 from './parts03/mouth.svg?react';
import Body3 from './parts03/body.svg?react';
import LArm3 from './parts03/l_arm.svg?react';
import RArm3 from './parts03/r_arm.svg?react';
import LLeg3 from './parts03/l_leg.svg?react';
import RLeg3 from './parts03/r_leg.svg?react';
import Chick3 from './parts03/chick.svg?react';

// Hats for character 1
import Hat1_1 from './parts01/hats/cap_head.svg?react';
import Hat1_2 from './parts01/hats/ex_head.svg?react';
import Hat1_3 from './parts01/hats/got_head.svg?react';
import Hat2_1 from './parts02/hats/cap_head.svg?react';
import Hat2_2 from './parts02/hats/ex_head.svg?react';
import Hat2_3 from './parts02/hats/got_head.svg?react';
import Hat3_1 from './parts03/hats/cap_head.svg?react';
import Hat3_2 from './parts03/hats/ex_head.svg?react';
import Hat3_3 from './parts03/hats/got_head.svg?react';

// Body import
import Body1_1 from './parts01/cloths/base_body.svg?react';
import LArm1_1 from './parts01/cloths/base_l_arm.svg?react';
import RArm1_1 from './parts01/cloths/base_r_arm.svg?react';
import Body1_2 from './parts01/cloths/ex_body.svg?react';
import LArm1_2 from './parts01/cloths/ex_l_arm.svg?react';
import RArm1_2 from './parts01/cloths/ex_r_arm.svg?react';
import Body1_3 from './parts01/cloths/uni_body.svg?react';
import LArm1_3 from './parts01/cloths/uni_l_arm.svg?react';
import RArm1_3 from './parts01/cloths/uni_r_arm.svg?react';

import Body2_1 from './parts02/cloths/base_body.svg?react';
import LArm2_1 from './parts02/cloths/base_l_arm.svg?react';
import RArm2_1 from './parts02/cloths/base_r_arm.svg?react';
import Body2_2 from './parts02/cloths/ex_body.svg?react';
import LArm2_2 from './parts02/cloths/ex_l_arm.svg?react';
import RArm2_2 from './parts02/cloths/ex_r_arm.svg?react';
import Body2_3 from './parts02/cloths/uni_body.svg?react';
import LArm2_3 from './parts02/cloths/uni_l_arm.svg?react';
import RArm2_3 from './parts02/cloths/uni_r_arm.svg?react';

import Body3_1 from './parts03/cloths/base_body.svg?react';
import LArm3_1 from './parts03/cloths/base_l_arm.svg?react';
import RArm3_1 from './parts03/cloths/base_r_arm.svg?react';
import Body3_2 from './parts03/cloths/ex_body.svg?react';
import LArm3_2 from './parts03/cloths/ex_l_arm.svg?react';
import RArm3_2 from './parts03/cloths/ex_r_arm.svg?react';
import Body3_3 from './parts03/cloths/uni_body.svg?react';
import LArm3_3 from './parts03/cloths/uni_l_arm.svg?react';
import RArm3_3 from './parts03/cloths/uni_r_arm.svg?react';

export const CLOTHS_MAP = {
  1: {
    1: { Body: Body1_1, LArm: LArm1_1, RArm: RArm1_1 },
    2: { Body: Body1_2, LArm: LArm1_2, RArm: RArm1_2 },
    3: { Body: Body1_3, LArm: LArm1_3, RArm: RArm1_3 },
  },
  2: {
    1: { Body: Body2_1, LArm: LArm2_1, RArm: RArm2_1 },
    2: { Body: Body2_2, LArm: LArm2_2, RArm: RArm2_2 },
    3: { Body: Body2_3, LArm: LArm2_3, RArm: RArm2_3 },
  },
  3: {
    1: { Body: Body3_1, LArm: LArm3_1, RArm: RArm3_1 },
    2: { Body: Body3_2, LArm: LArm3_2, RArm: RArm3_2 },
    3: { Body: Body3_3, LArm: LArm3_3, RArm: RArm3_3 },
  },
};

export const HATS_MAP = {
  1:{
    1: Hat1_1,
    2: Hat1_2,
    3: Hat1_3,
  },
  2:{
    1: Hat2_1,
    2: Hat2_2,
    3: Hat2_3,
  },
  3:{
    1: Hat3_1,
    2: Hat3_2,
    3: Hat3_3,
  }
};


export const PARTS_MAP = {
  1: {
    Head: Head1,
    Eye: Eye1,
    Mouth: Mouth1,
    Body: Body1,
    LArm: LArm1,
    RArm: RArm1,
    LLeg: LLeg1,
    RLeg: RLeg1,
    Chick: Chick1,
  },
  2: {
    Head: Head2,
    Eye: Eye2,
    Mouth: Mouth2,
    Body: Body2,
    LArm: LArm2,
    RArm: RArm2,
    LLeg: LLeg2,
    RLeg: RLeg2,
    Chick: Chick2,
  },
  3: {
    Head: Head3,
    Eye: Eye3,
    Mouth: Mouth3,
    Body: Body3,
    LArm: LArm3,
    RArm: RArm3,
    LLeg: LLeg3,
    RLeg: RLeg3,
    Chick: Chick3,
  },
};
