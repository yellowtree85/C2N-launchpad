import { useEffect, useMemo, useState } from "react";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";

import store from "@src/redux/store";
import axios from "@src/api/axios";

import PoolCard from "@src/components/elements/PoolCard";
import LivePools from "@src/containers/LivePools/LivePools";
import FinishedPools from "@src/containers/FinishedPools/FinishedPools";
import styles from "./pools.module.scss";
import WalletButton from "@src/components/elements/WalletButton";

import { useThirdParty } from "@src/hooks/useThirdParty";
import { usePageLoading } from "@src/hooks/usePageLoading";
import { useResponsive } from "@src/hooks/useResponsive";
import { useMessage } from "@src/hooks/useMessage";

import { Row, Col } from "antd";
// import Mask from '@src/components/elements/mask'

export default function Pools({ Component, pageProps }: AppProps) {
  const {} = useThirdParty();

  const { PageLoader, setPageLoading } = usePageLoading();

  const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();

  const { setErrorMessage } = useMessage();

  const [data, setData] = useState<Array<any>>([]);
  const livePoolsData = useMemo(() => {
    return data.filter((v) => {
      return [-1, 0, 1, 2, 3, 4].includes(v.status);
    });
  }, [data]);
  const finishedPoolsData = useMemo(() => {
    let d = data
      .filter((v) => {
        return [5].includes(v.status);
      })
      .sort((a, b) => {
        return a.saleEnd > b.saleEnd ? -1 : 0;
      });
    return d;
  }, [data]);

  useEffect(() => {
    setPageLoading(true);

    axios
      .get("/boba/product/list")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        setErrorMessage(
          "Network error, please check your network and refresh."
        );
        console.error(error);
      })
      .finally(() => {
        setPageLoading(false);
      });

    return () => {};
  }, []);
  const mockData = [
    {
      id: 1,
      name: "Project 1",
      description: "Description 1",
      img: "",
      status: -1,
      amount: "",
      saleContractAddress: "",
      tokenAddress: "",
      paymentToken: "",
      follower: 2,
      saleStart: 1848335873000,
      saleEnd: 1948334871000,
      registrationTimeStarts: 1748335700000,
      registrationTimeEnds: 1848334873000,
      createTime: 1748335000000,
      type: 0,
    },
    {
      id: 2,
      name: "Project 2",
      description: "Description 2",
      img: "",
      status: 0,
      amount: "",
      saleContractAddress: "",
      tokenAddress: "",
      paymentToken: "",
      follower: 22,
      registrationTimeStarts: 1748348700000,
      registrationTimeEnds: 1848334873000,
      saleStart: 1848335873000,
      saleEnd: 1948334871000,
      createTime: 1748335000000,
      type: 0,
    },
    {
      id: 3,
      name: "Project 3",
      description: "Description 3",
      img: "",
      status: 1,
      amount: "",
      saleContractAddress: "",
      tokenAddress: "",
      paymentToken: "",
      follower: 33,
      saleStart: 1848335873000,
      saleEnd: 1948334871000,
      registrationTimeStarts: 1748335100000,
      registrationTimeEnds: 1848334873000,
      createTime: 1748335000000,
      type: 0,
    },
    {
      id: 4,
      name: "Project 4",
      description: "Description 4",
      img: "",
      status: 2,
      amount: "",
      saleContractAddress: "",
      tokenAddress: "",
      paymentToken: "",
      follower: 33,
      saleStart: 1848335873000,
      saleEnd: 1948334871000,
      createTime: 1748335000000,
      registrationTimeStarts: 1748335100000,
      registrationTimeEnds: 1750984477000,
      type: 0,
    },
  ];
  /*
  useEffect(() => {
    setData(mockData);
  }, []);*/

  return (
    <main className={["container", styles["pools"]].join(" ")}>
      <PageLoader>
        {/* <Mask /> */}
        <section className={styles["sec-1"]}>
          <LivePools
            className={[styles["live-pools"], "main-content"].join(" ")}
            data={livePoolsData}
          ></LivePools>
        </section>
        <section className={styles["sec-2"]}>
          {finishedPoolsData && finishedPoolsData.length > 0 ? (
            <FinishedPools
              className="main-content"
              data={finishedPoolsData}
            ></FinishedPools>
          ) : (
            <></>
          )}
        </section>
      </PageLoader>
    </main>
  );
}
