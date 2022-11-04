<script>
import { computed } from "@vue/runtime-core";
import dayjs from 'dayjs';

const dateFormat = (unixTimeStamp) => {
  return computed(() => dayjs(parseInt(unixTimeStamp)).format('YYYY-MM-DD')).value;
}

export {
  dateFormat
};

</script>
