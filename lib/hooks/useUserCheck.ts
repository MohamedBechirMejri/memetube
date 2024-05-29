import { useEffect } from "react";
import { sleep } from "../utils";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { User } from "~/types/User";

type Props = {
  user: User | null;
  router: AppRouterInstance;
  duration?: number;
};

const useUserCheck = ({ user, router, duration = 1000 }: Props) => {
  useEffect(() => {
    const checkUser = async () => {
      await sleep(duration);
      if (!user) return router.push("/login");
    };

    checkUser();
  }, [user, router, duration]);

  return null;
};

export default useUserCheck;
