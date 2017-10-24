package fi.vm.yti.groupmanagement.util;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.Collection;
import java.util.Iterator;

public final class CollectionUtil {

    public static <T> @NotNull T requireSingle(@NotNull Collection<T> items) {

        if (items.size() != 1) {
            throw new RuntimeException("Expecting single item, was: " + items.size());
        }

        return items.iterator().next();
    }

    public static @Nullable <T> T requireSingleOrNone(@NotNull Collection<T> items) {

        if (items.size() > 1) {
            throw new RuntimeException("Expecting single item, was: " + items.size());
        }

        Iterator<T> iterator = items.iterator();

        if (iterator.hasNext()) {
            return iterator.next();
        } else {
            return null;
        }
    }


    private CollectionUtil() {
    }
}
